<template>
  <svg id="layer1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 367 530" height="250px">
    <title>Конвертер</title>
    <g id="konv" :style="konv">
      <path class="cls-1" d="M119.19,193.19l129.5.08,58.24,114.45-1.43,107-60.83,68.62-120.27.45L64.05,414.21l-1-107Z" />
      <path id="Фигура_2" data-name="Фигура 2" class="cls-2" d="M306.59,415.63l-60.73,70.94H122L61.23,415.63,60.82,306l58.31-112.86h8.09l-11.33,35.07-41.71,81-.41,97.55L129.24,470H238.57L294,406.76l-.41-97.55-41.7-81L240.6,193.14h8.1L307,306Z" />
      <path id="steel" :style="o2" class="cls-3" d="M76.2,352H291.49v53.2l-54.2,62.48H130.49L76.25,404.75Z" />
      <path class="cls-2" d="M294.54,305.58H315.6v23.79H294.54Z" />
      <path id="Rectangle_1_copy" data-name="Rectangle 1 copy" class="cls-1" d="M291.3,312.44h24.3v10H291.3Z" />
    </g>
    <g id="furm_o2" data-name="furm o2">
      <g id="o2" :style="o2">
        <path id="Фигура_1" data-name="Фигура 1" class="cls-4" d="M190.6,299.28h1.72l.06,17.68a2.72,2.72,0,0,0,2.72,2.44,2.83,2.83,0,0,0,2.77-2.89h0a2.74,2.74,0,0,0-.47-1.49,1.07,1.07,0,0,1-.26-1.48l.13-.15c.75-.66,1.51.54,1.51.54a4.29,4.29,0,0,1,.77,1.54,4.48,4.48,0,0,1-1,4.22,4.58,4.58,0,0,1-7.93-2.68Z" />
        <path id="Фигура_1_копия_2" data-name="Фигура 1 копия 2" class="cls-4" d="M186.92,299.28H185.2L185.14,317a2.72,2.72,0,0,1-2.73,2.44,2.84,2.84,0,0,1-2.77-2.91,2.78,2.78,0,0,1,.46-1.48,1,1,0,0,0,.27-1.47h0l-.14-.15c-.75-.66-1.5.54-1.5.54a4.29,4.29,0,0,0-.77,1.54,4.48,4.48,0,0,0,1,4.22A4.59,4.59,0,0,0,186.9,317Z" />
        <path id="Фигура_1_копия_3" data-name="Фигура 1 копия 3" class="cls-4" d="M189.77,323.44h-1.72l-.06,7.2a2.72,2.72,0,0,1-2.73,2.44,2.83,2.83,0,0,1-2.77-2.89v-.05a2.77,2.77,0,0,1,.47-1.5,1.06,1.06,0,0,0,.26-1.48h0l-.13-.15c-.76-.66-1.51.54-1.51.54a4.29,4.29,0,0,0-.77,1.54,4.48,4.48,0,0,0,1,4.22,4.59,4.59,0,0,0,7.94-2.68Z" />
        <path id="Фигура_1_копия_4" data-name="Фигура 1 копия 4" class="cls-4" d="M187.82,319.63h1.67l.07,7.19a2.7,2.7,0,0,0,2.69,2.43,2.81,2.81,0,0,0,2.75-2.87v0a2.74,2.74,0,0,0-.47-1.49,1.06,1.06,0,0,1-.25-1.48h0l.12-.14c.74-.66,1.49.54,1.49.54a4,4,0,0,1,.76,1.54,4.51,4.51,0,0,1-3.18,5.53h0a5.28,5.28,0,0,1-1.25.15,4.59,4.59,0,0,1-4.43-4.15Z" />
      </g>
      <rect id="furm" :style="furm" class="cls-2" x="185.03" width="7.63" height="291.94" />
    </g>
    <rect class="cls-5" x="127.95" y="400.95" width="111.79" height="40.67" rx="5" ry="5" />
    <text class="cls-6" transform="translate(156.14 434.89)">{{konvRotate ? parseFloat(konvRotate).toFixed(0):0 }} &deg</text>
  </svg>
</template>

<script>
  export default {
    props: {
      konvRotate:
        {
          type: Number,
          default:0
        },
      FOxygen: Number,
      FNitrogen: Number,
      furmHeight: Number
    },
    computed: {
      konv() {
        return {
          transformOrigin: "187px 340px",
          transform: 'rotate(-' + this.konvRotate + 'deg)'
        }
      },
      o2() {
        return {
          display: this.FOxygen > 0 || this.FNitrogen > 0 ? 'block' : 'none'
        }
      },
      furm() {
        return {
          height: this.furmHeight + 'px'
        }
      }
    }
  }

</script>

<style scoped>
        .cls-1 {
          fill: #bfbfbf;
        }

        .cls-2 {
          fill: #4c4c4c;
        }

        .cls-3 {
          fill: #df8c09;
        }

        .cls-4 {
          fill: #1e7ff7;
        }

        .cls-5 {
          fill: #000;
        }

        .cls-5 {
          opacity: 0.4;
        }

        .cls-6 {
          font-size: 36px;
          font-family: MyriadPro-Regular, Myriad Pro;
          fill: #fff;
        }
</style>

