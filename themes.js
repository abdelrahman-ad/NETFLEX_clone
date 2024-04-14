import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";


const config ={
    initialColorMode: "dark",
    useSystemColorMode : false
}

const styles = {
  global: props => ({
    body: {
      color: mode("white", "whiteAlpha.900")(props),
      bg: mode("black", "#141214")(props),
      
    },
  }),
};

export const theme = extendTheme({
  styles,
  config,
});
