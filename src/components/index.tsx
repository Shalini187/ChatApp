import { createContext } from "react";
import ThemeProvider from "./themeProvider";
import WrapperContainer from "./wrapperComponent";
import SystemSearch from './search';
import HeaderBar from "./header";
import Loader from "./loader";

const AuthContext = createContext({});
export { Loader, AuthContext, HeaderBar, SystemSearch, ThemeProvider, WrapperContainer };