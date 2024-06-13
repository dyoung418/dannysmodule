console.log("Danny's Module loaded."); // runs immediately when file is loaded

Hooks.on("init", function() {
  console.log("Danny's Module init hook"); // runs when foundry begins initialization workflow
});

Hooks.on("ready", function() {
  console.log("Danny's Module ready hook"); // runs once core initialization is ready and game data is available
});
