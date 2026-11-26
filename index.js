(function (exports) {
  "use strict";
  const { before } = vendetta.patcher;
  const { FluxDispatcher } = vendetta.metro.common;
  let unpatch;
  exports.onLoad = () => {
    unpatch = before("dispatch", FluxDispatcher, (args) => {
      const event = args[0];
      if (event && event.type === "MESSAGE_DELETE") {
        args[0] = { type: "MESSAGE_DELETE_IGNORED" };
      }
    });
  };
  exports.onUnload = () => {
    if (unpatch) unpatch();
  };
  return exports;
})({});
