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
        offset: 0.1,
        transform: "scale(1.3)"
      }),
      style({
        offset: 0.2,
        transform: "scale(1)"
      }),
      style({
        offset: 0.3,
        transform: "scale(1.3)"
      }),
      style({
        offset: 0.4,
        transform: "scale(1)"
      }),
      style({
        offset: 0.5,
        transform: "scale(1.3)"
      }),
      style({
        offset: 0.6,
        transform: "scale(1)"
      }),
      style({
        offset: 0.7,
        transform: "scale(1.3)"
      }),
      style({
        offset: 0.8,
        transform: "scale(1)"
      }),
      style({
        offset: 0.9,
        transform: "scale(1.3)"
      }),
      style({
        offset: 1.0,
        transform: "scale(1)"
      })
    ])
  )
);

export const customAnimations = {
  heart: heartBeat
};
