"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function algorithm(items) {
    var result = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    acceptParametersOrThrow(items, result);
    if (items.length == 0) return result;

    var normal = [];
    items.forEach(function (it) {
        normal.forEach(function (n) {
            if (it && n[1] == it[1]) {
                n[0] = +n[0] + +it[0];
                it = null;
            }
        });
        if (it) normal.push(it);
    });

    var b2t = normal.slice(0).sort(function (a, b) {
        return a[1] - b[1];
    });
    var sum = 0;b2t.forEach(function (item) {
        return sum += +item[0];
    });
    var len = b2t[b2t.length - 1][1];
    var avg = sum / len;

    var _loop = function _loop(i) {
        var itemAvg = b2t[i][0] / b2t[i][1];
        if (itemAvg > avg) {
            var part1 = b2t.slice(0, i + 1);
            var part2 = b2t.slice(i + 1).map(function (item) {
                return [item[0], item[1] - b2t[i][1]];
            });
            algorithm(part1, result);
            algorithm(part2, result);
            return {
                v: result
            };
        }
    };

    for (var i = 0; i < b2t.length; i++) {
        var _ret = _loop(i);

        if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
    }

    if (result.length > 0 && result[result.length - 1][0] == avg) {
        result[result.length - 1][1] += +len;
    } else {
        result.push([avg, len]);
    }
    return result;
}

function acceptParametersOrThrow(items, result) {
    if (!Array.isArray(result)) throw "Result param is not array";
    if (!Array.isArray(items)) throw "Items param is not array";

    items.forEach(function (it) {
        if (!Array.isArray(it)) throw "No all arrays in item param";
    });
    items.forEach(function (it) {
        if (!Number.isInteger(Number(it[1]))) throw "Month must be integer";
    });
    items.forEach(function (it) {
        if (!(Number(it[0]) > 0 && Number(it[1]) > 0)) throw "No all positive numbers in item arrays";
    });
}

try {
    module.exports.algorithm = algorithm;
} catch (e) {/* hack js to browser */}
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var View = function (_React$Component) {
    _inherits(View, _React$Component);

    function View(props) {
        _classCallCheck(this, View);

        var _this = _possibleConstructorReturn(this, (View.__proto__ || Object.getPrototypeOf(View)).call(this, props));

        _this.state = {
            error: false,
            update: -1,
            // items: [[400000,60, "auto"], [8000,12, "mobil"], [30000,10, "dovolena"]],
            // items: [[60000,12, "notebook"], [9000,24, "mobil"]],
            items: [],
            name: "",
            months: "",
            amount: ""
        };

        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleRemove = _this.handleRemove.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.handleChangeAmount = _this.handleChangeAmount.bind(_this);
        _this.handleChangeMonths = _this.handleChangeMonths.bind(_this);
        _this.handleChangeName = _this.handleChangeName.bind(_this);
        return _this;
    }

    _createClass(View, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            var end = 0;

            return React.createElement(
                "div",
                null,
                React.createElement(
                    "form",
                    { onSubmit: this.handleSubmit },
                    React.createElement(
                        "h2",
                        null,
                        "Vstup"
                    ),
                    this.state.error ? React.createElement(
                        "div",
                        { className: "alert alert-danger", role: "alert" },
                        React.createElement("span", { className: "glyphicon glyphicon-exclamation-sign", "aria-hidden": "true" }),
                        React.createElement(
                            "span",
                            { className: "sr-only" },
                            "Error:"
                        ),
                        React.createElement(
                            "span",
                            null,
                            " Chybicka ;-) ",
                            React.createElement("br", null),
                            "(Exception: ",
                            this.state.error,
                            ")"
                        )
                    ) : "",
                    React.createElement(
                        "table",
                        { className: "table table-bordered table-striped table-hover" },
                        React.createElement(
                            "thead",
                            { style: { background: "#EEEEEE" } },
                            React.createElement(
                                "tr",
                                null,
                                React.createElement(
                                    "th",
                                    null,
                                    "\u010C\xE1stka"
                                ),
                                React.createElement(
                                    "th",
                                    null,
                                    "Po\u010Det m\u011Bs\xEDc\u016F"
                                ),
                                React.createElement(
                                    "th",
                                    null,
                                    "N\xE1zev"
                                ),
                                React.createElement(
                                    "th",
                                    null,
                                    "Akce"
                                )
                            ),
                            React.createElement(
                                "tr",
                                null,
                                React.createElement(
                                    "th",
                                    null,
                                    React.createElement("input", { type: "text", value: this.state.amount, name: "amount", onChange: this.handleChangeAmount })
                                ),
                                React.createElement(
                                    "th",
                                    null,
                                    React.createElement("input", { type: "text", value: this.state.months, name: "months", onChange: this.handleChangeMonths })
                                ),
                                React.createElement(
                                    "th",
                                    null,
                                    React.createElement("input", { type: "text", value: this.state.name, name: "name", onChange: this.handleChangeName })
                                ),
                                React.createElement(
                                    "th",
                                    null,
                                    React.createElement(
                                        "button",
                                        { type: "submit", className: "btn btn-default", onClick: this.handleSubmit },
                                        this.state.update >= 0 ? "uprav" : "přidej"
                                    )
                                )
                            )
                        ),
                        React.createElement(
                            "tbody",
                            null,
                            this.state.items.map(function (it, index) {
                                return React.createElement(
                                    "tr",
                                    { key: "in" + index + Math.random(), style: _this2.state.update == index ? { background: "#B9FFC1" } : {} },
                                    React.createElement(
                                        "td",
                                        null,
                                        it[0]
                                    ),
                                    React.createElement(
                                        "td",
                                        null,
                                        it[1]
                                    ),
                                    React.createElement(
                                        "td",
                                        null,
                                        it[2]
                                    ),
                                    React.createElement(
                                        "td",
                                        null,
                                        React.createElement(
                                            "button",
                                            { className: "btn btn-default", onClick: function onClick() {
                                                    return _this2.handleChange(index);
                                                } },
                                            "uprav"
                                        ),
                                        React.createElement(
                                            "button",
                                            { className: "btn btn-danger", onClick: function onClick() {
                                                    return _this2.handleRemove(index);
                                                } },
                                            "odeber"
                                        )
                                    )
                                );
                            })
                        )
                    ),
                    React.createElement(
                        "h2",
                        null,
                        "V\xFDstup"
                    ),
                    React.createElement(
                        "table",
                        { className: "table table-bordered table-striped table-hover" },
                        React.createElement(
                            "thead",
                            { style: { background: "#EEEEEE" } },
                            React.createElement(
                                "tr",
                                null,
                                React.createElement(
                                    "th",
                                    null,
                                    "Interval"
                                ),
                                React.createElement(
                                    "th",
                                    null,
                                    "\u010C\xE1stka"
                                )
                            )
                        ),
                        React.createElement(
                            "tbody",
                            null,
                            algorithm(this.state.items).map(function (it, index) {
                                var start = end;
                                end = end - +-it[1];

                                return React.createElement(
                                    "tr",
                                    { key: "out" + index + Math.random() },
                                    React.createElement(
                                        "td",
                                        null,
                                        start - +-1,
                                        ". - ",
                                        end,
                                        ". m\u011Bs\xEDc"
                                    ),
                                    React.createElement(
                                        "td",
                                        null,
                                        it[0]
                                    )
                                );
                            })
                        )
                    )
                )
            );
        }
    }, {
        key: "handleChangeName",
        value: function handleChangeName(event) {
            this.setState({ name: event.target.value });
        }
    }, {
        key: "handleChangeMonths",
        value: function handleChangeMonths(event) {
            this.setState({ months: event.target.value });
        }
    }, {
        key: "handleChangeAmount",
        value: function handleChangeAmount(event) {
            this.setState({ amount: event.target.value });
        }
    }, {
        key: "handleSubmit",
        value: function handleSubmit(event) {
            event.preventDefault();
            try {
                var items = this.state.items.slice(0);
                var item = [this.state.amount, this.state.months, this.state.name];
                if (this.state.update >= 0) {
                    items[this.state.update] = item;
                } else {
                    items.push(item);
                }

                algorithm(items);
                this.setState({ update: -1, error: false, items: items, amount: "", months: "", name: "" });
                this.focus();
            } catch (e) {
                this.setState({ error: e.toString() });
            }
        }
    }, {
        key: "handleChange",
        value: function handleChange(index) {
            var item = this.state.items[index];
            this.setState({ update: index, error: false, amount: item[0], months: item[1], name: item[2] });
            this.focus();
        }
    }, {
        key: "handleRemove",
        value: function handleRemove(index) {
            this.setState({ update: -1, items: this.state.items.filter(function (it, itIndex) {
                    return index != itIndex;
                }) });
        }
    }, {
        key: "focus",
        value: function focus() {
            document.getElementsByName("amount")[0].focus();
        }
    }]);

    return View;
}(React.Component);
