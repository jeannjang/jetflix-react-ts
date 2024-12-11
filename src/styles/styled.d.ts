import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    black: {
      primary: string;
      second: string;
      third: string;
      primaryTransparent: string;
      secondTransparent: string;
      thirdTransparent: string;
    };
    white: {
      primary: string;
      second: string;
      third: string;
      primaryTransparent: string;
      secondTransparent: string;
      thirdTransparent: string;
    };
    red: string;
    yellow: string;
  }
}

//jetflix
