// node architecture
// 1. V8
// 2. Node Bindings (modules which are present in the node modules)
// 3. Libuv  => all the actions which used to occur on the weh browser. happens here
//      for example : - QUEUES : call-back queue + micro task queue
// Event Loop
// Child threads (worker threads) which handle I/O, network request
// therefore, a lot of the async ops of even-driven architecture is managed by libuv

// 1.38.00 diagram + explanation
