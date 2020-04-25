<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in Settings.vue is proprietary and confidential.                 -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 4 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-container
            class="text-center"
            fill-height
    >
        <v-row align="center">
            <v-col>
                <v-stepper v-model="e1">
                    <v-stepper-header>
                        <v-stepper-step :complete="e1 > 1" step="1">Name of step 1</v-stepper-step>
            
                        <v-divider></v-divider>
            
                        <v-stepper-step :complete="e1 > 2" step="2">Name of step 2</v-stepper-step>
            
                        <v-divider></v-divider>
            
                        <v-stepper-step step="3">Name of step 3</v-stepper-step>
                    </v-stepper-header>
        
                    <v-stepper-items>
                        <v-stepper-content step="1">
                            <v-card
                                    class="mb-12"
                                    color="grey lighten-1"
                            ></v-card>
                
                            <v-btn
                                    color="primary"
                                    @click="e1 = 2"
                            >
                                Continue
                            </v-btn>
                
                            <v-btn text>Cancel</v-btn>
                        </v-stepper-content>
            
                        <v-stepper-content step="2">
                            <v-card
                                    class="mb-12"
                                    color="grey lighten-1"
                                    :height="height"
                            >
                                <svg
                                        :width="width"
                                        :height="height"
                                        :viewBox="'0 0 ' + width + ' ' + height"
                                        @wheel="zoompan">
                                    <rect v-for="(r, idx) in rects" :key="idx"
                                          @mousedown="move($event, idx)"
                                          :fill="r.color"
                                          :x="r.x" :y="r.y" :width="r.w" :height="r.h">
                                    </rect>
                                </svg>
                            </v-card>
                
                            <v-btn
                                    color="primary"
                                    @click="e1 = 3"
                            >
                                Continue
                            </v-btn>
                
                            <v-btn text>Cancel</v-btn>
                        </v-stepper-content>
            
                        <v-stepper-content step="3">
                            <v-card
                                    class="mb-12"
                                    color="grey lighten-1"
                            ></v-card>
                
                            <v-btn
                                    color="primary"
                                    @click="e1 = 1"
                            >
                                Continue
                            </v-btn>
                
                            <v-btn text>Cancel</v-btn>
                        </v-stepper-content>
                    </v-stepper-items>
                </v-stepper>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "Settings",
        data: function() {
            return {
                e1: 1,
                width: 500,
                height: 500,
                ratio: 1,
                dx: 0,
                dy: 0,
                isMove: false,
                beforeMouseX: null,
                beforeMouseY: null,
                selectIdx: 0,
                rects: [
                    {
                        x: 10,
                        y: 10,
                        w: 100,
                        h: 100,
                        color: 'green'
                    },
                    {
                        x: 200,
                        y: 150,
                        w: 100,
                        h: 100,
                        color: 'red'
                    },
                    {
                        x: 310,
                        y: 410,
                        w: 200,
                        h: 100,
                        color: 'blue'
                    },
                ]
            }
        },
        mounted () {
            this.width = window.innerWidth;
            console.log('MOUNT LISTENER ON')
            document.addEventListener('mouseup', this.mouseUp)
            document.addEventListener('mousemove', this.mouseMove)
        },
        beforeDestroy () {
            console.log('MOUNT LISTENER OFF')
            document.removeEventListener('mouseup', this.mouseUp)
            document.removeEventListener('mousemove', this.mouseMove)
        },
        methods: {
            zoompan (e) {
                var [x, y, w, h] = this.viewport.split(' ').map(v => parseFloat(v))
                if (e.ctrlKey) {

                    if (e.deltaY > 0) {
                        w = w * 1.01
                        h = h * 1.01
                    } else {
                        w = w * 0.99
                        h = h * 0.99
                    }
                    this.makeViewBox(x, y, w, h)
                    this.ratio = w / this.width
                    e.preventDefault()
                } else {
                    // if ((this.dx + e.deltaX > -this.width && this.dy + e.deltaY > -this.width) &&
                    //     (this.dx + e.deltaX < this.width * 2 && this.dy + e.deltaY < this.width * 2)) {
                    //     this.makeViewBox(x + e.deltaX, y + e.deltaY, w, h)
                    //     this.dx += e.deltaX
                    //     this.dy += e.deltaY
                    // }
                }
            },
            makeViewBox (x, y, w, h) {
                this.viewport = [x, y, w, h].join(' ')
            },
            move (e, i) {
                this.isMove = true
                this.selectIdx = i
                e.preventDefault()
            },
            mouseUp (e) {
                this.isMove = false
                this.beforeMouseX = null
                this.beforeMouseY = null
                e.preventDefault()
            },
            mouseMove (e) {
                if (!this.isMove) return
                var mouseX = e.offsetX * this.ratio + this.dx
                var mouseY = e.offsetY * this.ratio + this.dy
                var dx = 0
                var dy = 0
                if (this.beforeMouseX && this.beforeMouseY) {
                    dx = mouseX - this.beforeMouseX
                    dy = mouseY - this.beforeMouseY
                }
                this.beforeMouseX = mouseX
                this.beforeMouseY = mouseY
                var tempX = dx + Number(this.rects[this.selectIdx].x)
                var tempY = dy + Number(this.rects[this.selectIdx].y)
                if (tempX > 0 && tempX < this.width - this.rects[this.selectIdx].w) this.rects[this.selectIdx].x = tempX
                if (tempY > 0 && tempY < this.height - this.rects[this.selectIdx].h) this.rects[this.selectIdx].y = tempY
                e.preventDefault()
            }
        }
    }
</script>

<style scoped>

</style>