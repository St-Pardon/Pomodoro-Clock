import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCaretLeft, faCaretRight, faPlay, faStop, faSlash, faUndoAlt } from '@fortawesome/free-solid-svg-icons'


library.add( faCaretLeft, faCaretRight, faPlay, faStop, faSlash, faUndoAlt )

ReactDOM.render(<App />, document.getElementById("root"));
