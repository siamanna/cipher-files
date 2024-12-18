const scenes = {
    start: {
      description: "Which mystery case would you like to solve?",
      options: [
        { label: "🔍 The Stolen Jewel", next: "jewel_intro" },
        { label: "👨‍🍳 The Missing Chef", next: "chef_intro" },
      ],
    },
    jewel_intro: {
      description:
        "A priceless jewel has been stolen! Where do you want to start?",
      options: [
        { label: "Inspect the crime scene 🕵️", next: "jewel_scene" },
        { label: "Question the museum guard 🚨", next: "jewel_guard" },
      ],
    },
    jewel_scene: {
      description: "The scene has muddy footprints and broken glass.",
      options: [
        { label: "Follow the footprints 👣", next: "jewel_footprints" },
        { label: "Call forensics 🧪", next: "jewel_forensics" },
      ],
    },
    jewel_guard: {
      description: "The guard says he heard faint footsteps before falling asleep.",
      options: [{ label: "Inspect security cameras 📹", next: "jewel_cameras" }],
    },
    chef_intro: {
      description: "The town's famous chef disappeared during dinner prep!",
      options: [
        { label: "Search the kitchen 🔪", next: "chef_kitchen" },
        { label: "Question the waiter 🍽️", next: "chef_waiter" },
      ],
    },
    chef_kitchen: {
      description: "The kitchen is clean, but you find a torn recipe page.",
      options: [{ label: "Read the recipe 📜", next: "chef_recipe" }],
    },
  };
  
  let currentScene = "start";
  
  function renderScene(sceneId) {
    const scene = scenes[sceneId];
    const description = document.getElementById("scene-description");
    const optionsContainer = document.getElementById("options-container");
  
    description.innerText = scene.description;
    optionsContainer.innerHTML = ""; // Clear previous buttons
  
    scene.options.forEach((option) => {
      const button = document.createElement("button");
      button.innerText = option.label;
      button.addEventListener("click", () => {
        renderScene(option.next);
      });
      optionsContainer.appendChild(button);
    });
  
    if (sceneId === "chef_recipe" || sceneId === "jewel_footprints") {
      document.getElementById("restart-btn").style.display = "block";
    }
  }
  
  document.getElementById("restart-btn").addEventListener("click", () => {
    currentScene = "start";
    renderScene("start");
    document.getElementById("restart-btn").style.display = "none";
  });
  
  renderScene(currentScene);
  