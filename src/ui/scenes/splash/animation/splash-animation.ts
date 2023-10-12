import AnimatedLottieView from 'lottie-react-native';

import { ISplashAnimation } from '../splash.component';

export class SplashAnimation implements ISplashAnimation {

  private static NUMBER_OF_FRAMES: number = 90;
  private static INTERMEDIATE_FRAME: number = 64;
  private static FPS: number = 30;

  public get lottieJson(): string {
    return require('./splash-lottie-animation.json');
  }

  public playTillIntermediate = (ref: AnimatedLottieView): Promise<void> => {
    return this.createAnimationPromise(ref, 0, SplashAnimation.INTERMEDIATE_FRAME);
  };

  public finish = (ref: AnimatedLottieView): Promise<void> => {
    return this.createAnimationPromise(ref, SplashAnimation.INTERMEDIATE_FRAME, SplashAnimation.NUMBER_OF_FRAMES);
  };

  private createAnimationPromise = (ref: AnimatedLottieView, startFrame: number, endFrame: number): Promise<void> => {
    return new Promise((resolve, _reject) => {
      ref.play(startFrame, endFrame);
      setTimeout(resolve, this.getFramesDuration(endFrame - startFrame));
    });
  };

  private getFramesDuration = (frames: number): number => {
    return frames / SplashAnimation.FPS * 1000;
  };
}
