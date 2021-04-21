export default {
  methods:{
    maps(x, in_min, in_max, out_min, out_max) {
      let out = Math.round((x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min);
      if (x < 0) {
        return out = out_max;
      }
      return out;
    }
  }
}

