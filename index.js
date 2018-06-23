import "./app/utils/ReactotronConfig";
import { AppRegistry } from "react-native";
import App from "./app/App";

import { Client } from "bugsnag-react-native";
const bugsnag = new Client();
bugsnag.notify(new Error("Test error"));

AppRegistry.registerComponent("reactAQ", () => App);
