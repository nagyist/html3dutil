/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/
var Extras = {
  "compact":function(arr) {
    "use strict";
    var fillOffset = 0;

    for(var i = 0;i < arr.length;i++) {
      if(fillOffset !== i && arr[i] !== null) {
        arr[fillOffset] = arr[i];
        fillOffset++;
      } else if(arr[i] !== null && typeof arr[i] !== "undefined") {
        fillOffset++;
      }
    }
    arr.splice(fillOffset, arr.length - fillOffset);
  },
  "includes":function(arr, value) {
    "use strict";
    for(var i = 0;i < arr.length;i++) {
      if(arr[i] === value)return true;
    }
    return false;
  }
};
var nextToken = function(tok) {
  "use strict";
  var a,
    x = null,
    e = null,
    t = null,
    token = null;

  x = tok[0];
  if (x.length === 0) {
    return ["end", null];
  }
  a = x.match(/^\s*(-?\d+(\.\d*)?)\s*/);
  if (a) {
    e = a[0];
    t = a[1];
    token = ["constant", t * 1.0];
    tok[0] = x.substr(e.length, x.length);
    return token;
  }
  a = x.match(/^\s*([\+\-\*\/\(\)\^])\s*/);
  if(a) {
    e = a[0];
    t = a[1];
    token = "plus";
    if (t === "-") {
      token = "minus";
    }
    if (t === "*") {
      token = "mul";
    }
    if (t === "/") {
      token = "div";
    }
    if (t === "(") {
      token = "lparen";
    }
    if (t === ")") {
      token = "rparen";
    }
    if (t === "^") {
      token = "pow";
    }
    token = [token, null];
    tok[0] = x.substr(e.length, x.length);
    return token;
  }
  a = x.match(/^\s*(sin|cos|sqrt|tan|acos|asin|atan|ln|abs)\s*/i);
  if(a) {
    e = a[0];
    t = a[1].toLowerCase();
    token = ["function", t];
    tok[0] = x.substr(e.length, x.length);
    return token;
  }
  a = x.match(/^\s*(pi|e)\s*/);
  if(a) {
    e = a[0];
    t = a[1];
    token = ["knownconstant", t];
    tok[0] = x.substr(e.length, x.length);
    return token;
  }
  a = x.match(/^\s*([a-z])/);
  if (a) {
    e = a[0];
    t = a[1];
    token = ["variable", t];
    tok[0] = x.substr(e.length, x.length);
    return token;
  }
  throw new Error("unexpected token");
};

var Operator = function(name) {
  "use strict";
  this.name = name;
};
/**
 * Converts this expression to a string.
 * @returns {String} Return value.
 * @memberof! Operator#
 */
Operator.prototype.toString = function() {
  "use strict";
  return this.name;
};

/**
 * Represents a variable with a given name.
 * @param {String} name Name of the variable.
 * @class
 * @alias Variable
 */
var Variable = function(name) {
  "use strict";
  this.name = name;
  this.negative = false;
};
var Operation = function(operator) {
  "use strict";
  this.operator = operator;
  this.nodes = [];
  this.negative = false;
};
var Constant = function(value, name) {
  "use strict";
  if (name === null || typeof name === "undefined") {
    name = null;
  }
  this.negative = value < 0;
  if (name === "pi") {
    this.name = name;
    this.value = Math.PI;
  } else if (name === "e") {
    this.name = name;
    this.value = Math.E;
  } else {
    this.name = null;
    this.value = value;
  }
};

var Expression = function() {
  "use strict";
  this.nodes = [];
};
/**
 * Determines whether the object is an operation, variable, or constant.
 * @param {Object} x The object to check.
 * @returns {Boolean} True if the object is an operation, variable, or constant; otherwise, false.
 */
Expression.isExpr = function(x) {
  "use strict";
  if(!x || typeof x === "undefined")return false;
  return x instanceof Operation || x instanceof Variable || x instanceof Constant;
};
/** @private */
Expression.prototype.simplify = function() {
  "use strict";
  return Expression.simplifyNodes(this.nodes);
};
/** @private */
Expression.simplifyNodes = function(nodes) {
  "use strict";
  var negative;
  var d,
    passes = null,
    pass__ = null,
    pass = null,
    prevNode = null,
    prevNodeIndex = null,
    i = null,
    node = null,
    nextNode = null,
    op = null;
      // Eliminate expression nodes
  for(i = 0;i < nodes.length;i++) {
    node = nodes[i];
    if(!node)continue;
    if(node instanceof Expression) {
      node.simplify();
      while (node instanceof Expression && node.nodes.length === 1) {
        nodes[i] = node.nodes[0];
        node = node.nodes[0];
      }
      if(node instanceof Expression) {
        throw new Error("unexpected expression");
      }
    }
  }

  prevNode = null;
  prevNodeIndex = -1;
  i = nodes.length - 1;
  while (i >= 0) {
    node = nodes[i];
    if (!node) {
      i += 1;
      continue;
    }
    if (node instanceof Operator && node.name === "pow") {
      if(i === 0)throw new Error("expressions expected before operator");
      nextNode = nodes[i + 1];
      prevNode = nodes[i - 1];
      if (!Expression.isExpr(prevNode) || !Expression.isExpr(nextNode)) {
        throw new Error("expressions expected between operator");
      }
      if(prevNode instanceof Expression)throw new Error("prevNode should not be Expression");
      if(prevNode instanceof Constant && prevNode.value < 0) {
        op = new Operation("pow");
        op.negative = true;
        op.nodes.push(prevNode.negate());
        op.nodes.push(nextNode);
      } else {
        op = new Operation(node.name === "minus" ? "plus" : node.name);
        negative = node.name === "minus";
        op.nodes.push(prevNode);
        op.nodes.push(negative ? nextNode.negate() : nextNode);
      }
      op.simplify();
      nodes[i - 1] = op;
      nodes[i] = null;
      nodes[i + 1] = null;
      prevNode = op;
      i -= 1;
    } else if (node instanceof Operation) {
      node.simplify();
      prevNode = node;
    } else {
      prevNodeIndex = i;
    }
    i -= 1;
  }
  Extras.compact(nodes);
  passes = [["mul", "div"], ["plus", "minus"]];
  for (pass__ = 0;pass__ < passes.length;pass__++) {
    pass = passes[pass__];
    prevNode = null;
    prevNodeIndex = -1;
    i = 0;
    while (i < nodes.length) {
      node = nodes[i];
      if (!node) {
        i += 1;
        continue;
      }
      d = node instanceof Operator;
      if (d !== false && (d !== null && typeof d !== "undefined") ? Extras.includes(pass, node.name) : d) {
        nextNode = nodes[i + 1];
        if (!Expression.isExpr(prevNode) || !Expression.isExpr(nextNode)) {
          throw new Error("expressions expected between operator");
        }
        if(prevNode instanceof Expression)throw new Error("prevNode should not be Expression");
        if(node.name === "pow" && prevNode instanceof Constant && prevNode.value < 0) {
          op = new Operation("pow");
          op.negative = true;
          op.nodes.push(prevNode.negate());
          op.nodes.push(nextNode);
        } else {
          op = new Operation(node.name === "minus" ? "plus" : node.name);
          negative = node.name === "minus";
          op.nodes.push(prevNode);
          op.nodes.push(negative ? nextNode.negate() : nextNode);
        }
        op.simplify();
        nodes[prevNodeIndex] = op;
        nodes[i] = null;
        nodes[i + 1] = null;
        prevNode = op;
        i -= 1;
      } else if (node instanceof Operation) {
        node.simplify();
        prevNodeIndex = i;
        prevNode = node;
      } else {
        prevNode = node;
        prevNodeIndex = i;
      }
      i += 1;
    }
    Extras.compact(nodes);
  }
};
/**
 * Converts this expression to a string.
 * @returns {String} This expresion converted to a string.
 * @memberof! Expression#
 */
Expression.prototype.toString = function() {
  "use strict";
  return "[" + this.nodes + "]";
};

/**
 * Gets the number of operands in this operation.
 * @memberof! Operation#
 * @returns {Number} Return value.
 */
Operation.prototype.length = function() {
  "use strict";
  return this.nodes.length;
};
/**
 * Gets an operand by index.
 * @param {Number} index The zero-based index of the operand to get.
 * @memberof! Operation#
 * @returns {Object} Return value.
 */
Operation.prototype.get = function(index) {
  "use strict";
  return this.nodes[index];
};
/**
 * Returns whether this operation is of the given type.
 * @param {String} op An operation type such as "plus" or "pow".
 * @memberof! Operation#
 * @returns {Boolean} True if this operation is of the given type; otherwise, false.
 */
Operation.prototype.isOperation = function(op) {
  "use strict";
  return this.operator === op;
};
/**
 * Returns whether this object is equal to another.
 * @param {Object} x Another object.
 * @memberof! Operation#
 * @returns {Boolean} True if both objects are operations and have the same properties.
 */
Operation.prototype.equals = function(x) {
  "use strict";
  var i = null;

  if (!(x instanceof Operation)) {
    return false;
  }
  if (!(this.nodes.length === x.nodes.length)) {
    return false;
  }
  if (!(this.negative === x.negative)) {
    return false;
  }
  if (!(this.operator === x.operator)) {
    return false;
  }
  for (i = 0;i < this.nodes.length;i++) {
    if (!(this.nodes[i] === x.nodes[i])) {
      return false;
    }
  }
  return true;
};
/** @private */
Operation.prototype.simplify = function() {
  "use strict";
  var b, c, d;
  var done = null,
    origlength = null,
    constVals = null,
    constValsIndex = null;
  var i = null;
  var node;
  var n__;
  var n = null;
  var realnode = null;
  var cv;
  var haveNonconst = null;

  var neg;
  var j;
  Expression.simplifyNodes(this.nodes);
  if ((b = (c = this.operator === "plus") !== false && (c !== null && typeof c !== "undefined") ? c : this.operator === "mul") !== false && (b !== null && typeof b !== "undefined") ? b : this.operator === "div") {
    done = false;
 // resimplify = false;
    while (!(b = done)) {
      origlength = this.nodes.length;
      done = true;
      constVals = null;
      constValsIndex = -1;
      i = 0;
      while (i < origlength) {
        node = this.nodes[i];
        d = this.negative !== node.negative;
        if (d && !(node instanceof Constant)) {
          i += 1;
          continue;
        }
        if (node instanceof Operation && node.operator === this.operator) {
          for (n__ = 0;n__ < node.nodes.length;n__++) {
            n = node.nodes[n__];
            realnode = n;
            this.nodes.push(realnode);
          }
          this.nodes[i] = null;
          done = false;
        } else if (node instanceof Operation && node.operator === "div" && this.operator === "mul") {
          var tbool = node.nodes.length === 2 && !node.negative && !this.negative &&
           node.nodes[0].constantValue() !== null && node.nodes[1].constantValue() !== null;
          if(tbool) {
            this.nodes.push(node.nodes[0]);
            this.nodes.push(new Constant(1.0 / node.nodes[1].constantValue()));
            this.nodes[i] = null;
            done = false;
          } else {
            cv = null;
            haveNonconst = false;
            c = node.nodes[1].constantValue();
            for (n__ = 0;n__ < node.nodes.length;n__++) {
              n = node.nodes[n__];
              c = n.constantValue();
              if (c !== null && typeof c !== "undefined") {
                if (cv === null || typeof cv === "undefined") {
                  cv = 1;
                }
                cv /= c;
              } else {
                haveNonconst = true;
              }
            }
            if (cv !== null && typeof cv !== "undefined" && !haveNonconst) {
              this.nodes.push(new Constant(cv));
              this.nodes[i] = null;
              done = false;
            }
          }
        } else if (this.operator === "plus") {
          cv = node.constantValue();
          if (cv === 0) {
            this.nodes[i] = null;
            done = false;
          }
        } else if (this.operator === "div") {
          cv = node.constantValue();
          if (cv === 1 && i > 0) {
            this.nodes[i] = null;
            done = false;
          }
          if (cv === 0 && i === 0) {
            var found = false;
            for (j = i + 1;j < this.nodes.length;j++) {
              if(this.nodes[j].constantValue() === 0) {
                found = true;
                break;
              }
            }
            if(!found) {
             // no non-zero nodes after the first
              this.nodes.splice(0, this.nodes.length);
              this.nodes[0] = new Constant(0);
              return this;
            }
          } else if(node.isOperation("mul") && i > 0) {
            for (j = 0;j < node.nodes.length;j++) {
              if(node.nodes[j].equals(this.nodes[0])) {
                this.nodes[0] = new Constant(1);
                node.nodes[j] = new Constant(1);
                node = node.degen();
                this.nodes[i] = node;
                done = false;
                break;
              }
            }
          }
        } else if (this.operator === "mul") {
          cv = node.constantValue();
          if (cv === 1) {
            this.nodes[i] = null;
            done = false;
          } else if (cv === 0) {
            this.nodes.splice(0, this.nodes.length);
            this.nodes[0] = new Constant(0);
            return this;
          } else if (cv === -1 && this.nodes.length === 2 && i === 0) {
            neg = this.nodes[1].negate();
            this.nodes.splice(0, this.nodes.length);
            this.nodes[0] = neg;
            return this;
          } else if (cv === -1 && this.nodes.length === 2 && i === 1) {
            neg = this.nodes[0].negate();
            this.nodes.splice(0, this.nodes.length);
            this.nodes[0] = neg;
            return this;
          } else if (cv !== null && typeof cv !== "undefined" && (constVals !== null && typeof constVals !== "undefined")) {
            constVals *= cv;
            this.nodes[constValsIndex] = new Constant(constVals);
            this.nodes[i] = null;
            done = false;
          } else if (cv !== null && typeof cv !== "undefined") {
            constVals = cv;
            constValsIndex = i;
          }
        }
        i += 1;
      }
      Extras.compact(this.nodes);
      if (this.nodes.length === 0) {
        if (this.operator === "plus") {
          this.nodes[0] = new Constant(0);
        } else {
          this.nodes[0] = new Constant(1);
        }
      }
    }
  }
  return this;
};
/** @private */
Operation.prototype.degen = function() {
  "use strict";
  var cv = null;
  this.simplify();
  if (this.operator === "plus" || this.operator === "mul" || this.operator === "div") {
    if (this.nodes.length === 1 && !this.negative) {
      return this.nodes[0].degen();
    }
  }
  cv = this.constantValue();
  if (!((cv === null || typeof cv === "undefined"))) {
    return new Constant(cv);
  }
  return this;
};
/**
 * Gets the value of this constant.
 * @returns {String} The value of this constant, or null if this expression isn't a constant.
 * @memberof! Operation#
 */
Operation.prototype.constantValue = function() {
  "use strict";
  var b, c,
    val = null,
    node__ = null,
    node = null,
    cv = null;

  if ((b = (c = this.operator === "plus") !== false && (c !== null && typeof c !== "undefined") ? c : this.operator === "mul") !== false && (b !== null && typeof b !== "undefined") ? b : this.operator === "div") {
    val = null;
    for (node__ = 0;node__ < this.nodes.length;node__++) {
      node = this.nodes[node__];
      cv = node.constantValue();
      if (cv === null || typeof cv === "undefined") {
        return null;
      }
      if (val === null || typeof val === "undefined") {
        val = cv;
      } else {
        if (this.operator === "plus") {
          val += cv;
        }
        if (this.operator === "mul") {
          val *= cv;
        }
        if (cv === 0 && this.operator === "mul") {
          return 0;
        }
        if (this.operator === "div") {
          val /= cv;
        }
      }
    }
    return this.negative ? -val : val;
  } else {
    if(this.operator === "pow") {
      var cv1 = this.nodes[0].constantValue();
      var cv2 = this.nodes[1].constantValue();
      if(cv1 !== null && typeof cv1 !== "undefined" && (cv2 !== null && typeof cv2 !== "undefined")) {
        var ret = Math.pow(cv1, cv2);
        return this.negative ? -ret : ret;
      }
    }
    return null;
  }
};
/** @private */
Operation.func = function(operation) {
  "use strict";
  var op = null,
    arg = null;
  op = new Operation(operation);
  for (arg = 1;arg < arguments.length;arg++) {
    op.nodes.push(arguments[arg]);
  }
  return op.degen();
};
/** @private */
Operation.prototype.combineOp = function(operation, x) {
  "use strict";
  var op = null;

  if (typeof x === "number") {
    x = new Constant(x);
  }
  if (operation === "pow") {
    var cv = x.constantValue();
    if(cv === 0) {
      return new Constant(1);
    } else if(cv === 1) {
      return this;
    }
  }
  op = new Operation(operation);
  op.nodes.push(this);
  op.nodes.push(x);
  return op.degen();
};
/**
 * Does a deep copy of this object and its operands
 * @memberof! Operation#
 * @returns {Operation} A deep copy of this object.
 */
Operation.prototype.copy = function() {
  "use strict";
  var op = new Operation(this.operator);
  op.negative = this.negative;
  for (var node__ = 0;node__ < this.nodes.length;node__++) {
    op.nodes.push(this.nodes[node__].copy());
  }
  return op;
};
/**
 * Returns the negated form of this object.
 * @memberof! Operation#
 * @returns {Operation} The negated form of this object.
 */
Operation.prototype.negate = function() {
  "use strict";
  var op = null,
    node__ = null;
  op = new Operation(this.operator);
  if(op.operator === "plus") {
    for (node__ = 0;node__ < this.nodes.length;node__++) {
      op.nodes.push(this.nodes[node__].negate());
    }
  } else if(op.operator === "mul" || op.operator === "div") {
    for (node__ = 0;node__ < this.nodes.length;node__++) {
      op.nodes.push(node__ === 0 ? this.nodes[node__].negate() : this.nodes[node__]);
    }
  } else {
    op.negative = !this.negative;
    for (node__ = 0;node__ < this.nodes.length;node__++) {
      op.nodes.push(this.nodes[node__]);
    }
  }
  return op.degen();
};
/**
 * Returns an expression equal to this operation minus another expression.
 * @param {Expression} x An expression.
 * @memberof! Operation#
 * @returns {Expression} Return value.
 */
Operation.prototype.subtract = function(x) {
  "use strict";
  return this.add(typeof x === "number" ? -x : x.negate());
};
/**
 * Returns an expression equal to this operation plus another expression.
 * @param {Expression} x An expression.
 * @memberof! Operation#
 * @returns {Expression} Return value.
 */
Operation.prototype.add = function(x) {
  "use strict";
  return this.combineOp("plus", x);
};
/**
 * Returns an expression equal to this operation times another expression.
 * @param {Expression} x An expression.
 * @memberof! Operation#
 * @returns {Expression} Return value.
 */
Operation.prototype.multiply = function(x) {
  "use strict";

  if (this.operator === "div" && this.nodes.length === 2) {
    if(this.nodes[1].equals(x)) {
      return this.nodes[0];
    }
  }
  if (this.operator === "mul") {
    for(var i = 0;i < this.nodes.length;i++) {
      if(this.nodes[i].equals(x)) {
        var c = this.copy();
        c.nodes[i] = Operation.func("pow", c.nodes[i], new Constant(2));
        return c;
      }
    }
  }
  if (this.equals(x)) {
    return Operation.func("pow", x, new Constant(2));
  }
  return this.combineOp("mul", x);
};
/**
 * Returns an expression equal to this operation divided by another expression.
 * @param {Expression} x An expression.
 * @memberof! Operation#
 * @returns {Expression} Return value.
 */
Operation.prototype.divide = function(x) {
  "use strict";
  return this.combineOp("div", x);
};
/**
 * Converts this expression to a string that JavaScript can evaluate.
 * @returns {String} Return value.
 * @memberof! Operation#
 */
Operation.prototype.toJSString = function() {
  "use strict";
  var b, c, d,
    opArray = null,
    i__ = null,
    i = null,
    paren = null,
    ret = null,
    op = null;
  var p1;
  opArray = [];
  for (i__ = 0;i__ < this.nodes.length;i__++) {
    i = this.nodes[i__];
    if(i instanceof Variable) {
      if(i.name !== "u" && i.name !== "v") {
        throw new Error("invalid variable " + i.name);
      }
    }
    paren = (b = i instanceof Operation, b !== false && (b !== null && typeof b !== "undefined") ? (c = (d = i.operator === "plus") !== false && (d !== null && typeof d !== "undefined") ?
       d : i.operator === "mul") !== false && (c !== null && typeof c !== "undefined") ? c : i.operator === "div" : b);
    opArray.push(paren !== false && (paren !== null && typeof paren !== "undefined") ? "(" + i.toJSString() + ")" : i.toJSString());
  }

  if (this.operator === "plus") {
    ret = "";
    if (this.negative) {
      ret += "-(";
    }
    for (i = 0;i < opArray.length;i++) {
      op = opArray[i];
      if (i > 0) {
        ret += " + ";
      }
      ret += op.toString();
    }
    if (this.negative) {
      ret += ")";
    }
    return ret;
  } else if (this.operator === "mul") {
    return (this.negative ? "-" : "") + opArray.join("*");
  } else if (this.operator === "div") {
    return (this.negative ? "-" : "") + opArray.join("/");
  } else if (this.operator === "sqrt") {
    p1 = opArray[0];
    return (this.negative ? "-" : "") + "(((" + p1 + ")<0 ? -1 : 1)*Math.pow(Math.abs(" + p1 + "),0.5))";
  } else if (this.operator === "pow") {
    p1 = opArray[0];
    var p2 = opArray[1];
    return (this.negative ? "-" : "") + "(((" + p1 + ")<0 ? -1 : 1)*Math.pow(Math.abs(" + p1 + ")," + p2 + "))";
  } else {
    var oper = this.operator;
    if(oper === "ln")oper = "log";
    return (this.negative ? "-" : "") + ("Math." + oper + "(") + opArray.join(", ") + ")";
  }
};
/**
 * Converts this expression to a string.
 * @returns {String} Return value.
 * @memberof! Operation#
 */
Operation.prototype.toString = function() {
  "use strict";
  var b, c, d,
    opArray = null,
    i__ = null,
    i = null,
    paren = null,
    ret = null,
    op = null;

  opArray = [];
  for (i__ = 0;i__ < this.nodes.length;i__++) {
    i = this.nodes[i__];
    paren = (b = i instanceof Operation, b !== false && (b !== null && typeof b !== "undefined") ?
        (c = (d = i.operator === "plus") !== false && (d !== null && typeof d !== "undefined") ? d : i.operator === "mul") !== false &&
        (c !== null && typeof c !== "undefined") ? c : i.operator === "div" : b);
    opArray.push(paren !== false && (paren !== null && typeof paren !== "undefined") ? "(" + i.toString() + ")" : i.toString());
  }

  if (this.operator === "plus") {
    ret = "";
    if (this.negative) {
      ret += "-(";
    }
    for (i = 0;i < opArray.length;i++) {
      op = opArray[i];
      if (i > 0) {
        ret += " + ";
      }
      ret += op.toString();
    }
    if (this.negative) {
      ret += ")";
    }
    return ret;
  } else if (this.operator === "mul") {
    return (this.negative ? "-" : "") + opArray.join("*");
  } else if (this.operator === "div") {
    return (this.negative ? "-" : "") + opArray.join("/");
  } else if (this.operator === "pow") {
    return (this.negative ? "-" : "") + opArray.join("^");
  } else {
    return (this.negative ? "-" : "") + ("" + this.operator + "(") + opArray.join(", ") + ")";
  }
};

/**
 * Returns whether this variable is an operation.
 * @memberof! Variable#
 * @returns {Boolean} Always false.
 */
Variable.prototype.isOperation = function() {
  "use strict";
  return false;
};
/**
 * Returns a copy of this object.
 * @memberof! Variable#
 * @returns {Variable} This object (which is currently treated as immutable).
 */
Variable.prototype.copy = function() {
  "use strict";
  return this;
};
/**
 * Gets the value of this variable.
 * @returns {String} Null, since variables are not constants.
 * @memberof! Variable#
 */
Variable.prototype.constantValue = function() {
  "use strict";
  return null;
};
/**
 * Returns whether this object is equal to another.
 * @param {Object} x Another object.
 * @memberof! Variable#
 * @returns {Boolean} True if both objects are variables and have the same name and sign.
 */
Variable.prototype.equals = function(x) {
  "use strict";

  if (!(x instanceof Variable)) {
    return false;
  }
  if (this.negative !== x.negative) {
    return false;
  }
  return this.name === x.name;
};
/**
 * Converts this expression to a string that JavaScript can evaluate.
 * @returns {String} Return value.
 * @memberof! Variable#
 */
Variable.prototype.toJSString = function() {
  "use strict";
  return this.toString();
};
/**
 * Converts this expression to a string.
 * @returns {String} Return value.
 * @memberof! Variable#
 */
Variable.prototype.toString = function() {
  "use strict";

  return (this.negative ? "-" : "") + this.name;
};
/** @private */
Variable.prototype.combineOp = function(operation, x) {
  "use strict";
  var op = null,
    cv = null;

  if (typeof x === "number") {
    x = new Constant(x);
  }
  op = new Operation(operation);
  if (operation === "mul") {
    op.nodes.push(x);
    op.nodes.push(this);
  } else if (operation === "pow") {
    cv = x.constantValue();
    if (cv === 1) {
      return this;
    }
    op.nodes.push(this);
    op.nodes.push(x);
  } else {
    op.nodes.push(this);
    op.nodes.push(x);
  }
  return op.degen();
};
/** @private */
Variable.prototype.degen = function() {
  "use strict";
  return this;
};
/**
 * Returns an expression equal to this operation plus another expression.
 * @param {Expression} x An expression.
 * @memberof! Variable#
 * @returns {Expression} Return value.
 */
Variable.prototype.add = function(x) {
  "use strict";
  return this.combineOp("plus", x);
};
/**
 * Returns a negated form of this variable
 * @memberof! Variable#
 * @returns {Variable} Return value.
 */
Variable.prototype.negate = function() {
  "use strict";
  var v = null;

  v = new Variable(this.name);
  v.negative = !this.negative;
  return v;
};
/**
 * Returns an expression equal to this operation minus another expression.
 * @param {Expression} x An expression.
 * @memberof! Variable#
 * @returns {Expression} Return value.
 */
Variable.prototype.subtract = function(x) {
  "use strict";

  return this.add(typeof x === "number" ? -x : x.negate());
};
/**
 * Returns this variable multiplied by another expression.
 * @param {Expression} x Another expression.
 * @memberof! Variable#
 * @returns {Expression} Return value.
 */
Variable.prototype.multiply = function(x) {
  "use strict";
  return this.combineOp("mul", x);
};
/**
 * Returns an expression equal to this variable divided by another expression.
 * @param {Expression} x An expression.
 * @memberof! Variable#
 * @returns {Expression} Return value.
 */
Variable.prototype.divide = function(x) {
  "use strict";
  return this.combineOp("div", x);
};

/**
 * Returns a copy Constant this object.
 * @memberof! Variable#
 * @returns {Constant} This object (which is currently treated as immutable).
 */
Constant.prototype.copy = function() {
  "use strict";
  return this;
};
/**
 * Returns whether this constant is an operation.
 * @memberof! Constant#
 * @returns {Boolean} Always false.
 */
Constant.prototype.isOperation = function() {
  "use strict";
  return false;
};
/**
 * Returns whether this object is equal to another.
 * @param {Object} x Another object.
 * @memberof! Constant#
 * @returns {Boolean} True if both objects are constants and have the same value.
 */
Constant.prototype.equals = function(x) {
  "use strict";

  if (!(x instanceof Constant)) {
    return false;
  }
  return this.value === x.value;
};
/**
 * Gets the value of this constant.
 * @returns {String} Return value.
 * @memberof! Constant#
 */
Constant.prototype.constantValue = function() {
  "use strict";
  return this.value;
};
/** @private */
Constant.prototype.degen = function() {
  "use strict";
  return this;
};
/**
 * Converts this expression to a string that JavaScript can evaluate.
 * @returns {String} Return value.
 * @memberof! Constant#
 */
Constant.prototype.toJSString = function() {
  "use strict";
  var vi = this.value.toString();
  if (vi.substr(vi.length - 2, vi.length) === ".0") {
    vi = vi.substr(0, vi.length - 2);
  }
  return vi;
};
/**
 * Converts this expression to a string.
 * @returns {String} Return value.
 * @memberof! Constant#
 */
Constant.prototype.toString = function() {
  "use strict";
  var vi = null;
  if (this.name) {
    return this.name.toString();
  }
  vi = this.value.toString();
  if (vi.substr(vi.length - 2, vi.length) === ".0") {
    vi = vi.substr(0, vi.length - 2);
  }
  return vi;
};
/** @private */
Constant.prototype.combineOp = function(operation, x) {
  "use strict";
  var op = null;

  if (typeof x === "number") {
    x = new Constant(x);
  }
  op = new Operation(operation);
  op.nodes.push(this);
  op.nodes.push(x);
  if (!(op.constantValue() === null)) {
    return new Constant(op.constantValue());
  }
  return op.degen();
};
/**
 * Returns a constant with the negated value of this one.
 * @memberof! Constant#
 * @returns {Object} Return value.
 */
Constant.prototype.negate = function() {
  "use strict";
  return new Constant(-this.value);
};
/**
 * Returns a constant with the given value added to this one,
 * or an expression that adds this constant and the given operation.
 * @param {Number|Expression} x A number or an expression.
 * @memberof! Constant#
 * @returns {Operation} Return value.
 */
Constant.prototype.add = function(x) {
  "use strict";

  if (typeof x === "number") {
    return new Constant(x + this.constantValue());
  }
  return this.combineOp("plus", x);
};
/**
 * Returns a constant with the given value subtracted from this one,
 * or an expression that subtracts the given operation from this constant.
 * @param {Number|Expression} x A number or an expression.
 * @memberof! Constant#
 * @returns {Object} Return value.
 */
Constant.prototype.subtract = function(x) {
  "use strict";

  return this.add(typeof x === "number" ? -x : x.negate());
};
/**
 * Returns a constant with the given value multiplied by this one,
 * or an expression that multiplies this constant and the given operation.
 * @param {Number|Expression} x A number or an expression.
 * @memberof! Constant#
 * @returns {Object} Return value.
 */
Constant.prototype.multiply = function(x) {
  "use strict";

  if (typeof x === "number") {
    return new Constant(x * this.constantValue());
  }
  return this.combineOp("mul", x);
};
/**
 * Returns a constant with the given value divided by this one,
 * or an expression that divides this constant and the given operation.
 * @param {Number|Expression} x A number or an expression.
 * @memberof! Constant#
 * @returns {Object} Return value.
 */
Constant.prototype.divide = function(x) {
  "use strict";

  if (typeof x === "number") {
    return new Constant(x / this.constantValue());
  }
  return this.combineOp("div", x);
};

/* exported getExpression */
var getExpression = function(expr) {
  "use strict";
  var c, d, e,
    test = null,
    tokens = null,
    token = null,
    expressions = null,
    i = null,
    lastexpr = null,
    prevexpr = null,
    expression = null,
    ret = null;

  test = [expr];
  tokens = [];
  while (!((token = nextToken(test))[0] === "end")) {
    tokens.push(token);
  }
  expressions = [new Expression()];
  i = 0;
  while (i < tokens.length) {
    token = tokens[i];
    if (expressions.length === 0) {
      throw new Error("unbalanced");
    }
    lastexpr = expressions[expressions.length - 1];
    if (token[0] === "lparen") {
      prevexpr = lastexpr.nodes.length === 0 ? null : lastexpr.nodes[lastexpr.nodes.length - 1];
      if ((c = prevexpr !== false && (prevexpr !== null && typeof prevexpr !== "undefined")) ? (d = (e = prevexpr instanceof Constant) !== false && (e !== null && typeof e !== "undefined") ? e : prevexpr instanceof Variable) !== false && (d !== null && typeof d !== "undefined") ? d : prevexpr instanceof Expression : c) {
        lastexpr.nodes.push(new Operator("mul"));
      }
      expressions.push(new Expression());
    } else if (token[0] === "rparen") {
      expressions.pop();
      if (expressions.length === 0) {
        throw new Error("unbalanced");
      }
      expressions[expressions.length - 1].nodes.push(lastexpr);
    } else if (token[0] === "function") {
      if (!(((((c = i + 1 >= tokens.length) !== false && (c !== null && typeof c !== "undefined") ? c : tokens[i + 1][0] === "lparen"))))) {
        throw new Error("left paren expected");
      }
      i += 1;
      expressions.push(new Operation(token[1]));
    } else if (token[0] === "constant") {
      if (token[1] < 0) {
        prevexpr = lastexpr.nodes.length === 0 ? null : lastexpr.nodes[lastexpr.nodes.length - 1];
        if ((c = prevexpr !== false && (prevexpr !== null && typeof prevexpr !== "undefined")) ?
          !((d = prevexpr instanceof Operator, d !== false && (d !== null && typeof d !== "undefined") ? prevexpr.name === "pow" : d)) : c) {
          lastexpr.nodes.push(new Operator("plus"));
        }
        lastexpr.nodes.push(new Constant(token[1]));
      } else {
        lastexpr.nodes.push(new Constant(token[1]));
      }
    } else if (token[0] === "variable") {
      prevexpr = lastexpr.nodes.length === 0 ? null : lastexpr.nodes[lastexpr.nodes.length - 1];
      if ((c = prevexpr !== false && (prevexpr !== null && typeof prevexpr !== "undefined")) ? (d = (e = prevexpr instanceof Constant) !== false && (e !== null && typeof e !== "undefined") ? e : prevexpr instanceof Variable) !== false && (d !== null && typeof d !== "undefined") ? d : prevexpr instanceof Expression : c) {
        lastexpr.nodes.push(new Operator("mul"));
      }
      lastexpr.nodes.push(new Variable(token[1]));
    } else if (token[0] === "knownconstant") {
      prevexpr = lastexpr.nodes.length === 0 ? null : lastexpr.nodes[lastexpr.nodes.length - 1];
      if ((c = prevexpr !== false && (prevexpr !== null && typeof prevexpr !== "undefined")) ? (d = (e = prevexpr instanceof Constant) !== false && (e !== null && typeof e !== "undefined") ? e : prevexpr instanceof Variable) !== false && (d !== null && typeof d !== "undefined") ? d : prevexpr instanceof Expression : c) {
        lastexpr.nodes.push(new Operator("mul"));
      }
      lastexpr.nodes.push(new Constant(null, token[1]));
    } else {
      if(token[0] === "minus" && lastexpr.nodes.length === 0) {
        lastexpr.nodes.push(new Constant(0));
      }
      lastexpr.nodes.push(new Operator(token[0]));
    }
    i += 1;
  }
  if (!(expressions.length === 1)) {
    throw new Error("unbalanced");
  }
  expression = expressions[0];
  expression.simplify();
  ret = expression.nodes[0];
  return ret.degen();
};
/* exported getSingleVariable */
var getSingleVariable = function(op, variable) {
  "use strict";
  var i = null,
    node = null;

  for (i = 0;i < op.length();i++) {
    node = op.get(i);
    if (node instanceof Operation) {
      if (!this.getSingleVariable(node, variable)) {
        return false;
      }
    } else if (node instanceof Variable) {
      if (variable.length === 1) {
        return false;
      }
      variable.push(node);
    }
  }
  return true;
};

var findPartialDerivative = function(expr, differential) {
  "use strict";
  var product = function(expr, start, count) {
    var ret = null,
      i = null;
    if (count === 1) {
      return expr.get(start);
    }
    ret = new Constant(1);
    for (i = 0;i < count;i++) {
      ret = ret.multiply(expr.get(start + i));
    }
    return ret;
  };
  var quotient = function(expr, start, count) {
    var ret = null,
      i = null;

    if (count === 1) {
      return expr.get(start);
    }
    ret = new Constant(1);
    for (i = 0;i < count;i++) {
      ret = ret.divide(expr.get(start + i));
    }
    return ret;
  };

  var deriv1 = null,
    deriv2 = null,
    cutoff = null,
    e0 = null,
    e1 = null,
    sq = null,
    ops = null,
    i = null;
  var ex, cv;
  var ret;
  if(typeof differential === "string")differential = new Variable(differential);
  if (!(expr.constantValue() === null)) {
    return new Constant(0);
  } else if (expr.isOperation("pow")) {
    if(expr.get(1).constantValue() !== null && expr.get(0).constantValue() === null) {
       // base variable, exponent constant
      ret = expr.get(1).multiply(expr.get(0).combineOp("pow", expr.get(1).subtract(1)));
      ret = ret.multiply(findPartialDerivative(expr.get(0), differential));
    } else if(expr.get(0).constantValue() === Math.E &&
        expr.get(1).constantValue() === null) {
       // base E, exponent variable
      ret = expr.multiply(findPartialDerivative(expr.get(1), differential));
    } else {
       // exponent variable
      ret = expr.multiply(findPartialDerivative(Operation.func("ln", expr), differential));
    }
    return expr.negative ? ret.negate() : ret;
  } else if (expr.isOperation("sqrt")) {
       // Treat sqrt as pow(x, 0.5)
    return findPartialDerivative(
         expr.get(0).combineOp("pow", new Constant(0.5))
           .multiply(expr.negative ? -1 : 1), differential);
  } else if (expr instanceof Variable) {
    if(expr.name === differential.name) {
      return new Constant(expr.negative ? -1 : 1);
    } else {
        // other variables are treated as constants
      return new Constant(0);
    }
  } else if (expr.isOperation("mul")) {
    if (expr.length() === 1) {
      return findPartialDerivative(expr.get(0), differential);
    } else {
      e0 = expr.get(0);
      e1 = expr.get(1);
      if (expr.length() > 2) {
        cutoff = expr.length() / 2 | 0;
        e0 = product(expr, 0, cutoff);
        e1 = product(expr, cutoff, expr.length() - cutoff);
      }
      deriv1 = findPartialDerivative(e0, differential).multiply(e1);
      deriv2 = findPartialDerivative(e1, differential).multiply(e0);
      return deriv1.add(deriv2);
    }
  } else if (expr.isOperation("div")) {
    if (expr.length() === 1) {
      return findPartialDerivative(expr.get(0));
    } else {
      e0 = expr.get(0);
      e1 = expr.get(1);
      if (expr.length() > 2) {
        cutoff = expr.length() / 2 | 0;
        e0 = quotient(expr, 0, cutoff);
        e1 = quotient(expr, cutoff, expr.length() - cutoff);
      }
      deriv1 = findPartialDerivative(e0, differential).multiply(e1);
      deriv2 = findPartialDerivative(e1, differential).multiply(e0);
      sq = e1.multiply(e1);
      return deriv1.subtract(deriv2).divide(sq);
    }
  } else if (expr.isOperation("plus")) {
    ops = new Constant(0);
    for (i = 0;i < expr.length();i++) {
      ops = ops.add(findPartialDerivative(expr.get(i), differential));
    }
    return ops;
  } else if (expr.isOperation("ln")) {
    ex = expr.get(0);
    if(ex.isOperation("mul") && ex.length() >= 2) {
      cutoff = ex.length() / 2 | 0;
      e0 = product(ex, 0, cutoff);
      e1 = product(ex, cutoff, ex.length() - cutoff);
      return findPartialDerivative(Operation.func("ln", e0).add(Operation.func("ln", e1)), differential);
    } else if(ex.isOperation("pow")) {
      cv = ex.constantValue(ex.get(1));
      var cv0 = ex.constantValue(ex.get(0));
      if(cv === null || typeof cv === "undefined" || Math.floor(cv) === cv || (cv0 === null || typeof cv0 === "undefined" || cv0 > 0)) {
           // only works for rational exponents
        return findPartialDerivative(ex.get(1).multiply(Operation.func("ln", ex.get(0))), differential);
      }
    }
    return findPartialDerivative(expr.get(0), differential).divide(ex).multiply(expr.negative ? -1 : 1);
  } else if (expr.isOperation("sin")) {
    return Operation.func("cos", expr.get(0)).multiply(findPartialDerivative(expr.get(0), differential))
       .multiply(expr.negative ? -1 : 1);
  } else if (expr.isOperation("abs")) {
    ex = expr.get(0);
    cv = ex.getConstantValue();
    if(cv !== null && typeof cv !== "undefined" && cv < 0)return new Constant(-1);
    if(cv !== null && typeof cv !== "undefined" && cv > 0)return new Constant(1);
    ret = ex.divide(Operation.func("abs", ex))
       .multiply(expr.negative ? -1 : 1);
    return ret.multiply(findPartialDerivative(expr.get(0), differential));
  } else if (expr.isOperation("cos")) {
    return Operation.func("sin", expr.get(0)).negate().multiply(findPartialDerivative(expr.get(0), differential))
       .multiply(expr.negative ? -1 : 1);
  } else if (expr.isOperation("tan")) {
    ret = new Constant(1).divide(Operation.func("cos", expr.get(0)).combineOp("pow", 2))
       .multiply(expr.negative ? -1 : 1);
    return ret.multiply(findPartialDerivative(expr.get(0), differential));
  } else if (expr.isOperation("asin")) {
    return findPartialDerivative(expr.get(0), differential).divide(
         new Constant(1).subtract(expr.get(0).combineOp("pow", 2)).combineOp("pow", 0.5))
       .multiply(expr.negative ? -1 : 1);
  } else if (expr.isOperation("acos")) {
    return findPartialDerivative(expr.get(0), differential).divide(
         new Constant(1).subtract(expr.get(0).combineOp("pow", 2)).combineOp("pow", 0.5)).negate()
       .multiply(expr.negative ? -1 : 1);
  } else if (expr.isOperation("atan")) {
    return findPartialDerivative(expr.get(0), differential).divide(
         expr.get(0).combineOp("pow", 2).add(1))
       .multiply(expr.negative ? -1 : 1);
  } else {
    throw new Error("unsupported function");
  }
};

/* exported normalCalcExpr */
function normalCalcExpr(vecExpr) {
  "use strict";
  var varu = new Variable("u");
  var varv = new Variable("v");
   // partial derivative with respect to u (binormal)
  var derivU = [
    findPartialDerivative(vecExpr[0], varu),
    findPartialDerivative(vecExpr[1], varu),
    findPartialDerivative(vecExpr[2], varu)
  ];
   // partial derivative with respect to v (tangent)
  var derivV = [
    findPartialDerivative(vecExpr[0], varv),
    findPartialDerivative(vecExpr[1], varv),
    findPartialDerivative(vecExpr[2], varv)
  ];
   // cross product
  return [derivU[1].multiply(derivV[2]).subtract(derivU[2].multiply(derivV[1])),
    derivU[2].multiply(derivV[0]).subtract(derivU[0].multiply(derivV[2])),
    derivU[0].multiply(derivV[1]).subtract(derivU[1].multiply(derivV[0]))];
}
