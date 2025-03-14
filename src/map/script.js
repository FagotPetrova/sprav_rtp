(function (F) {
    var B, C, I, L, K, H, E, G, A, J;
    B = document.namespaces;
    has_canvas = !!document.createElement("canvas").getContext;
    if (!(has_canvas || B)) {
        F.fn.maphilight = function () {
            return this
        };
        return
    }
    if (has_canvas) {
        E = function (M) {
            return Math.max(0, Math.min(parseInt(M, 16), 255))
        };
        G = function (M, N) {
            return "rgba(" + E(M.substr(0, 2)) + "," + E(M.substr(2, 2)) + "," + E(M.substr(4, 2)) + "," + N + ")"
        };
        C = function (M) {
            var N = F('<canvas style="width:' + M.width + "px;height:" + M.height + 'px;"></canvas>').get(0);
            N.getContext("2d").clearRect(0, 0, N.width, N.height);
            return N
        };
        I = function (P, M, S, O, N) {
            var R, Q = P.getContext("2d");
            Q.beginPath();
            if (M == "rect") {
                Q.rect(S[0], S[1], S[2] - S[0], S[3] - S[1])
            } else {
                if (M == "poly") {
                    Q.moveTo(S[0], S[1]);
                    for (R = 2; R < S.length; R += 2) {
                        Q.lineTo(S[R], S[R + 1])
                    }
                } else {
                    if (M == "circ") {
                        Q.arc(S[0], S[1], S[2], 0, Math.PI * 2, false)
                    }
                }
            }
            Q.closePath();
            if (O.fill) {
                Q.fillStyle = G(O.fillColor, O.fillOpacity);
                Q.fill()
            }
            if (O.stroke) {
                Q.strokeStyle = G(O.strokeColor, O.strokeOpacity);
                Q.lineWidth = O.strokeWidth;
                Q.stroke()
            }
            if (O.fade) {
                F(P).css("opacity", 0).animate({opacity: 1}, 100)
            }
        };
        L = function (M) {
            M.getContext("2d").clearRect(0, 0, M.width, M.height)
        }
    } else {
        C = function (M) {
            return F('<var style="zoom:1;overflow:hidden;display:block;width:' + M.width + "px;height:" + M.height + 'px;"></var>').get(0)
        };
        I = function (N, Q, R, U, M) {
            var S, T, O, P;
            S = '<v:fill color="#' + U.fillColor + '" opacity="' + (U.fill ? U.fillOpacity : 0) + '" />';
            T = (U.stroke ? 'strokeweight="' + U.strokeWidth + '" stroked="t" strokecolor="#' + U.strokeColor + '"' : 'stroked="f"');
            O = '<v:stroke opacity="' + U.strokeOpacity + '"/>';
            if (Q == "rect") {
                P = F('<v:rect name="' + M + '" filled="t" ' + T + ' style="zoom:1;margin:0;padding:0;display:block;position:absolute;left:' + R[0] + "px;top:" + R[1] + "px;width:" + (R[2] - R[0]) + "px;height:" + (R[3] - R[1]) + 'px;"></v:rect>')
            } else {
                if (Q == "poly") {
                    P = F('<v:shape name="' + M + '" filled="t" ' + T + ' coordorigin="0,0" coordsize="' + N.width + "," + N.height + '" path="m ' + R[0] + "," + R[1] + " l " + R.join(",") + ' x e" style="zoom:1;margin:0;padding:0;display:block;position:absolute;top:0px;left:0px;width:' + N.width + "px;height:" + N.height + 'px;"></v:shape>')
                } else {
                    if (Q == "circ") {
                        P = F('<v:oval name="' + M + '" filled="t" ' + T + ' style="zoom:1;margin:0;padding:0;display:block;position:absolute;left:' + (R[0] - R[2]) + "px;top:" + (R[1] - R[2]) + "px;width:" + (R[2] * 2) + "px;height:" + (R[2] * 2) + 'px;"></v:oval>')
                    }
                }
            }
            P.get(0).innerHTML = S + O;
            F(N).append(P)
        };
        L = function (M) {
            F(M).find("[name=highlighted]").remove()
        }
    }
    K = function (N) {
        var M, O = N.getAttribute("coords").split(",");
        for (M = 0; M < O.length; M++) {
            O[M] = parseFloat(O[M])
        }
        return [N.getAttribute("shape").toLowerCase().substr(0, 4), O]
    };
    J = function (O, N) {
        var M = F(O);
        return F.extend({}, N, F.metadata ? M.metadata() : false, M.data("maphilight"))
    };
    A = function (M) {
        if (!M.complete) {
            return false
        }
        if (typeof M.naturalWidth != "undefined" && M.naturalWidth == 0) {
            return false
        }
        return true
    };
    H = {position: "absolute", left: 0, top: 0, padding: 0, border: 0};
    var D = false;
    F.fn.maphilight = function (O) {
        O = F.extend({}, F.fn.maphilight.defaults, O);
        if (!has_canvas && F.browser.msie && !D) {
            document.namespaces.add("v", "urn:schemas-microsoft-com:vml");
            var N = document.createStyleSheet();
            var M = ["shape", "rect", "oval", "circ", "fill", "stroke", "imagedata", "group", "textbox"];
            F.each(M, function () {
                N.addRule("v\\:" + this, "behavior: url(#default#VML); antialias:true")
            });
            D = true
        }
        return this.each(function () {
            var U, R, Y, Q, T, V, X, S, W;
            U = F(this);
            if (!A(this)) {
                return window.setTimeout(function () {
                    U.maphilight(O)
                }, 200)
            }
            Y = F.extend({}, O, F.metadata ? U.metadata() : false, U.data("maphilight"));
            W = U.get(0).getAttribute("usemap");
            Q = F('map[name="' + W.substr(1) + '"]');
            if (!(U.is("img") && W && Q.size() > 0)) {
                return
            }
            if (U.hasClass("maphilighted")) {
                var P = U.parent();
                U.insertBefore(P);
                P.remove();
                F(Q).unbind(".maphilight").find("area[coords]").unbind(".maphilight")
            }
            R = F("<div></div>").css({
                display: "block",
                background: 'url("' + this.src + '")',
                position: "relative",
                padding: 0,
                width: this.width,
                height: this.height
            });
            if (Y.wrapClass) {
                if (Y.wrapClass === true) {
                    R.addClass(F(this).attr("class"))
                } else {
                    R.addClass(Y.wrapClass)
                }
            }
            U.before(R).css("opacity", 0).css(H).remove();
            if (F.browser.msie) {
                U.css("filter", "Alpha(opacity=0)")
            }
            R.append(U);
            T = C(this);
            F(T).css(H);
            T.height = this.height;
            T.width = this.width;
            X = function (c) {
                var a, b;
                b = J(this, Y);
                if (!b.neverOn && !b.alwaysOn) {
                    a = K(this);
                    I(T, a[0], a[1], b, "highlighted");
                    if (b.groupBy) {
                        var Z;
                        if (/^[a-zA-Z][-a-zA-Z]+$/.test(b.groupBy)) {
                            Z = Q.find("area[" + b.groupBy + '="' + F(this).attr(b.groupBy) + '"]')
                        } else {
                            Z = Q.find(b.groupBy)
                        }
                        var d = this;
                        Z.each(function () {
                            if (this != d) {
                                var f = J(this, Y);
                                if (!f.neverOn && !f.alwaysOn) {
                                    var e = K(this);
                                    I(T, e[0], e[1], f, "highlighted")
                                }
                            }
                        })
                    }
                    if (!has_canvas) {
                        F(T).append("<v:rect></v:rect>")
                    }
                }
            };
            F(Q).bind("alwaysOn.maphilight", function () {
                if (V) {
                    L(V)
                }
                if (!has_canvas) {
                    F(T).empty()
                }
                F(Q).find("area[coords]").each(function () {
                    var Z, a;
                    a = J(this, Y);
                    if (a.alwaysOn) {
                        if (!V && has_canvas) {
                            V = C(U.get());
                            F(V).css(H);
                            V.width = U.width();
                            V.height = U.height();
                            U.before(V)
                        }
                        a.fade = a.alwaysOnFade;
                        Z = K(this);
                        if (has_canvas) {
                            I(V, Z[0], Z[1], a, "")
                        } else {
                            I(T, Z[0], Z[1], a, "")
                        }
                    }
                })
            });
            F(Q).trigger("alwaysOn.maphilight").find("area[coords]").bind("mouseover.maphilight", X).bind("mouseout.maphilight", function (Z) {
                L(T)
            });
            U.before(T);
            U.addClass("maphilighted")
        })
    };
    F.fn.maphilight.defaults = {
        fill: true,
        fillColor: "000000",
        fillOpacity: 0.2,
        stroke: true,
        strokeColor: "ff0000",
        strokeOpacity: 1,
        strokeWidth: 1,
        fade: true,
        alwaysOn: false,
        neverOn: false,
        groupBy: false,
        wrapClass: true
    }
})(jQuery);