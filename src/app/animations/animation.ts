import { animation, animate, keyframes, style } from "@angular/animations";

const heartBeat = animation(
  animate(
    "4s",
    keyframes([
      style({
        offset: 0,
        transform: "scale(1)"
      }),
      style({
        offset: 0.15,
        transform: "scale(1.3)"
      }),
      style({
        offset: 0.3,
        transform: "scale(1)"
      }),
      style({
        offset: 0.45,
        transform: "scale(1.3)"
      }),
      style({
        offset: 0.6,
        transform: "scale(1)"
      }),
      style({
        offset: 0.75,
        transform: "scale(1.3)"
      }),
      style({
        offset: 1,
        transform: "scale(1)"
      })
    ])
  )
);

export const customAnimations = {
  heart: heartBeat
};
