import { h as n, nextTick as d } from "vue";
const x = (e) => {
  const t = e.split(" ").filter((s) => s !== "").map((s) => parseInt(s));
  return t.length < 1 || t.length > 4 ? !1 : t.every((s) => typeof s == "number" && s >= 0);
}, b = (e) => {
  const t = e.split(" ").filter((s) => s !== "").map((s) => parseInt(s));
  switch (t.length) {
    case 4:
      return { top: t[0], right: t[1], bottom: t[2], left: t[3] };
    case 3:
      return { top: t[0], right: t[1], bottom: t[2], left: t[1] };
    case 2:
      return { top: t[0], right: t[1], bottom: t[0], left: t[1] };
    default:
      return { top: t[0], right: t[0], bottom: t[0], left: t[0] };
  }
}, p = {
  name: "TrendChartGrid",
  props: {
    boundary: {
      required: !0,
      type: Object
    },
    verticalLines: {
      default: !1,
      type: Boolean
    },
    verticalLinesNumber: {
      default: 0,
      type: Number
    },
    horizontalLines: {
      default: !1,
      type: Boolean
    },
    horizontalLinesNumber: {
      default: 0,
      type: Number
    }
  },
  methods: {
    setVerticalLinesParams(e) {
      const { boundary: t, verticalLinesNumber: s } = this, i = s > 1 ? (t.maxX - t.minX) / (s - 1) : 0, a = t.minX + i * (e - 1), r = t.minY, l = t.maxY;
      return {
        x1: a,
        x2: a,
        y1: r,
        y2: l,
        stroke: "rgba(0,0,0,0.1)"
      };
    },
    setHorizontalLinesParams(e) {
      const { boundary: t, horizontalLinesNumber: s } = this, i = s > 1 ? (t.maxY - t.minY) / (s - 1) : 0, a = t.maxY - i * (e - 1), r = t.minX, l = t.maxX;
      return {
        x1: r,
        x2: l,
        y1: a,
        y2: a,
        stroke: "rgba(0,0,0,0.1)"
      };
    }
  },
  render() {
    if (!this.verticalLines && !this.horizontalLines)
      return;
    const e = [];
    if (this.verticalLines && this.verticalLinesNumber > 0) {
      const t = [];
      for (let s = 1; s <= this.verticalLinesNumber; s++)
        t.push(
          n("line", {
            class: "line",
            ...this.setVerticalLinesParams(s)
          })
        );
      e.push(
        n(
          "g",
          {
            class: "vertical"
          },
          t
        )
      );
    }
    if (this.horizontalLines && this.horizontalLinesNumber > 0) {
      const t = [];
      for (let s = 1; s <= this.horizontalLinesNumber; s++)
        t.push(
          n("line", {
            class: "line",
            ...this.setHorizontalLinesParams(s)
          })
        );
      e.push(
        n(
          "g",
          {
            class: "horizontal"
          },
          t
        )
      );
    }
    return n("g", e);
  }
}, f = {
  name: "TrendChartLabels",
  props: {
    boundary: {
      required: !0,
      type: Object
    },
    minValue: {
      type: Number
    },
    maxValue: {
      type: Number
    },
    xLabels: {
      type: Array
    },
    yLabels: {
      type: Number
    },
    yLabelsTextFormatter: {
      default: (e) => e,
      type: Function
    }
  },
  data() {
    return {
      xLabelHeight: null,
      yLabelHeight: null
    };
  },
  methods: {
    setXLabelsParams(e) {
      const { boundary: t, xLabels: s } = this, i = (t.maxX - t.minX) / (s.length - 1), a = t.minX + i * e, r = t.maxY;
      return { transform: `translate(${a}, ${r})` };
    },
    setYLabelsParams(e) {
      const { boundary: t, yLabels: s } = this, i = (t.maxY - t.minY) / (s - 1), a = t.minX, r = t.maxY - i * e;
      return { transform: `translate(${a}, ${r})` };
    }
  },
  mounted() {
    this.xLabels && this.xLabels.length && (this.xLabelHeight = this.$refs.xLabels.querySelector("text").getBoundingClientRect().height), this.yLabels && this.yLabels > 0 && (this.yLabelHeight = this.$refs.yLabels.querySelector("text").getBoundingClientRect().height);
  },
  render() {
    if (!(this.xLabels && this.xLabels.length) && !(this.yLabels && this.yLabels > 0))
      return;
    const e = [];
    if (this.xLabels && this.xLabels.length && e.push(
      n(
        "g",
        {
          class: "x-labels",
          ref: "xLabels"
        },
        this.xLabels.map((t, s) => n(
          "g",
          {
            class: "label",
            ...this.setXLabelsParams(s)
          },
          [
            n(
              "text",
              {
                dy: this.xLabelHeight + 5,
                "text-anchor": "middle"
              },
              t
            ),
            n("line", { stroke: "rgba(0,0,0,0.1)", y2: 5 })
          ]
        ))
      )
    ), this.yLabels && this.yLabels > 0) {
      const t = [];
      for (let s = 0; s < this.yLabels; s++)
        t.push(
          n(
            "g",
            {
              class: "label",
              ...this.setYLabelsParams(s)
            },
            [
              n(
                "text",
                {
                  dx: -10,
                  dy: this.yLabelHeight / 4,
                  "text-anchor": "end"
                },
                this.yLabelsTextFormatter(
                  this.minValue + (this.maxValue - this.minValue) / (this.yLabels - 1) * s
                )
              ),
              n("line", {
                stroke: "rgba(0,0,0,0.1)",
                x1: 0,
                x2: -5
              })
            ]
          )
        );
      e.push(
        n(
          "g",
          {
            class: "y-labels",
            ref: "yLabels"
          },
          t
        )
      );
    }
    return n("g", e);
  }
}, L = (e, t, s, i, a) => {
  e = e.map((o) => typeof o == "number" ? o : o.value);
  const r = i - 1e-3, l = (t.maxX - t.minX) / (a - 1), h = (t.maxY - t.minY) / (s + 1e-3 - r);
  return e.map((o, c) => ({
    x: c * l + t.minX,
    y: t.maxY - (o - r) * h + +(c === a - 1) * 1e-5 - +(c === 0) * 1e-5
  }));
}, v = (e, t, { maxY: s }) => {
  const i = [...e], a = i.shift(), r = i[i.length - 1], h = (i[0].x - a.x) / 2;
  let o = `M ${a.x},${a.y}`;
  i.forEach((u, g) => {
    if (!t)
      o += ` L${u.x},${u.y}`;
    else {
      const m = i[g - 1] || a;
      o += ` C ${h + m.x},${m.y} ${h + m.x},${u.y} ${u.x},${u.y}`;
    }
  });
  let c = o;
  return r.Y !== s && (c += ` L${r.x},${s}`), a.Y !== s && (c += ` L${a.x},${s}`), c += " Z", { linePath: o, fillPath: c };
}, y = {
  name: "TrendChartCurve",
  props: {
    boundary: {
      required: !0,
      type: Object
    },
    minValue: {
      required: !0,
      type: Number
    },
    maxValue: {
      required: !0,
      type: Number
    },
    maxAmount: {
      required: !0,
      type: Number
    },
    activeLineParams: {
      type: Object
    },
    data: {
      required: !0,
      type: Array
    },
    className: {
      type: String
    },
    smooth: {
      default: !1,
      type: Boolean
    },
    stroke: {
      default: !0,
      type: Boolean
    },
    fill: {
      default: !1,
      type: Boolean
    },
    showPoints: {
      default: !1,
      type: Boolean
    }
  },
  computed: {
    points() {
      return L(
        this.data,
        this.boundary,
        this.maxValue,
        this.minValue,
        this.maxAmount
      );
    },
    paths() {
      return v(this.points, this.smooth, this.boundary);
    }
  },
  render() {
    const e = [];
    return this.fill && this.paths && this.paths.fillPath && e.push(
      n("path", {
        class: "fill",
        d: this.paths.fillPath,
        fill: "rgba(0,0,0,0.15)"
      })
    ), this.stroke && this.paths && this.paths.linePath && e.push(
      n("path", {
        class: "stroke",
        d: this.paths.linePath,
        fill: "none",
        stroke: "black"
      })
    ), this.showPoints && this.points && e.push(
      n(
        "g",
        {
          class: "points"
        },
        this.points.map(
          (t, s) => n("circle", {
            class: {
              point: !0,
              "is-active": this.activeLineParams && this.activeLineParams.index === s
            },
            cx: t.x,
            cy: t.y,
            r: 2,
            stroke: "#000000",
            "stroke-width": 1
          })
        )
      )
    ), n(
      "g",
      {
        class: this.className
      },
      e
    );
  }
}, P = {
  name: "TrendChart",
  emits: ["mouse-move"],
  components: { TrendChartGrid: p, TrendChartLabels: f, TrendChartCurve: y },
  props: {
    datasets: {
      required: !0,
      type: Array
    },
    grid: {
      default: null,
      type: Object
    },
    labels: {
      default: null,
      type: Object
    },
    max: {
      type: Number
    },
    min: {
      type: Number
    },
    padding: {
      default: "5",
      type: String,
      validator(e) {
        return x(e);
      }
    },
    interactive: {
      default: !1,
      type: Boolean
    }
  },
  data() {
    return {
      width: null,
      height: null,
      labelsOverflowObject: { top: 0, right: 0, bottom: 0, left: 0 },
      activeLine: null,
      activeLineParams: null
    };
  },
  computed: {
    paddingObject() {
      return this.padding ? b(this.padding) : b("0");
    },
    boundary() {
      const { width: e, height: t, paddingObject: s, labelsOverflowObject: i } = this;
      return {
        minX: s.left + i.left,
        minY: s.top + i.top,
        maxX: e - s.right - i.right,
        maxY: t - s.bottom - i.bottom
      };
    },
    params() {
      let e = -1 / 0, t = 1 / 0, s = 0;
      return this.datasets.forEach((i) => {
        let a = i.data.map(
          (h) => typeof h == "number" ? h : h.value
        ), r = Math.max(...a);
        r > e && (e = r);
        let l = Math.min(...a);
        l < t && (t = l), a.length > s && (s = a.length);
      }), this.max !== void 0 && this.max > e && (e = this.max), this.min !== void 0 && this.min < t && (t = this.min), { maxValue: e, minValue: t, maxAmount: s };
    },
    chartOverlayParams() {
      const { boundary: e } = this, t = e.maxX - e.minX, s = e.maxY - e.minY;
      return {
        x: e.minX,
        y: e.minY,
        width: t > 0 ? t : 0,
        height: s > 0 ? s : 0,
        opacity: 0
      };
    },
    chartAxesXCoords() {
      const e = [], t = (this.boundary.maxX - this.boundary.minX) / (this.params.maxAmount - 1);
      for (let s = 0; s < this.params.maxAmount; s++)
        e.push(t * s + this.boundary.minX);
      return e;
    }
  },
  methods: {
    setSize() {
      if (this.$refs.chart) {
        const e = this.$refs.chart.getBoundingClientRect();
        this.width = e.width, this.height = e.height;
      }
    },
    fitLabels() {
      const e = this.$refs.chart, t = this.$refs.labels;
      if (t && (t.xLabels && t.xLabels.length || t.yLabels > 0)) {
        const s = e.getBoundingClientRect(), i = t.$el.getBoundingClientRect(), a = s.top - i.top + this.paddingObject.top, r = i.right - s.right + this.paddingObject.right, l = i.bottom - s.bottom + this.paddingObject.bottom, h = this.paddingObject.left - i.left + s.left;
        this.labelsOverflowObject = {
          top: a > 0 ? a : 0,
          right: r > 0 ? r : 0,
          bottom: l > 0 ? l : 0,
          left: h > 0 ? h : 0
        };
      } else
        this.labelsOverflowObject = { top: 0, right: 0, bottom: 0, left: 0 };
    },
    init() {
      this.setSize(), d(() => {
        this.fitLabels();
      });
    },
    getNearestCoordinate(e) {
      return this.chartAxesXCoords.reduce(
        (t, s) => Math.abs(t) > Math.abs(s - e) ? s - e : t,
        1 / 0
      ) + e;
    },
    mouseMove(e) {
      if (this.$refs.chart !== void 0) {
        const t = this.$refs.chart.getBoundingClientRect();
        this.activeLine = this.getNearestCoordinate(e.clientX - t.left);
      }
    },
    mouseOut() {
      this.activeLine = null, this.activeLineParams = null;
    },
    onWindowResize() {
      this.setSize();
    }
  },
  watch: {
    activeLine(e) {
      const t = [];
      e && (this.activeLineParams = {
        index: this.chartAxesXCoords.indexOf(this.activeLine)
      }, this.datasets.forEach((s) => {
        t.push(s.data[this.activeLineParams.index]);
      })), this.$emit(
        "mouse-move",
        this.activeLineParams ? { ...this.activeLineParams, data: t } : null
      );
    },
    labels: {
      handler() {
        this.labelsOverflowObject = { top: 0, right: 0, bottom: 0, left: 0 }, d(() => {
          this.fitLabels();
        });
      },
      deep: !0
    }
  },
  mounted() {
    this.init(), window.addEventListener("resize", this.onWindowResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.onWindowResize);
  },
  render() {
    const e = [];
    return this.grid && e.push(
      n(p, {
        class: "grid",
        verticalLines: this.grid.verticalLines,
        verticalLinesNumber: this.grid.verticalLinesNumber || this.params.maxAmount,
        horizontalLines: this.grid.horizontalLines,
        horizontalLinesNumber: this.grid.horizontalLinesNumber || this.labels && this.labels.yLabels || 0,
        boundary: this.boundary
      })
    ), this.interactive && this.chartOverlayParams && e.push(
      n("line", {
        class: "active-line",
        ref: "active-line",
        x1: this.activeLine || this.boundary.minX,
        x2: this.activeLine || this.boundary.minX,
        y1: this.boundary.minY,
        y2: this.boundary.maxY,
        stroke: "black",
        visibility: this.activeLine ? "visible" : "hidden"
      })
    ), this.labels && e.push(
      n(f, {
        class: "labels",
        ref: "labels",
        ...this.labels,
        boundary: this.boundary,
        minValue: this.params.minValue,
        maxValue: this.params.maxValue
      })
    ), this.datasets.map((t) => {
      e.push(
        n(y, {
          class: "curve",
          ...t,
          boundary: this.boundary,
          minValue: this.params.minValue,
          maxValue: this.params.maxValue,
          maxAmount: this.params.maxAmount,
          activeLineParams: this.activeLineParams
        })
      );
    }), this.interactive && this.chartOverlayParams && e.push(
      n("rect", {
        ref: "interactive-area",
        ...this.chartOverlayParams,
        onmousemove: (t) => this.mouseMove(t),
        onmouseout: () => this.mouseOut()
      })
    ), n(
      "svg",
      {
        class: "vtc",
        ref: "chart",
        xmlns: "http://www.w3.org/2000/svg",
        width: "100%",
        height: "100%"
      },
      e
    );
  }
}, O = {
  install: (e, t) => {
    e.component("TrendChart", P);
  }
};
export {
  O as default
};
