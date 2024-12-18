const scenes = {
    start: {
      description: "Which mystery case would you like to solve?",
      options: [
        { label: "🔍 The Stolen Jewel", next: "jewel_intro" },
        { label: "👨‍🍳 The Missing Chef", next: "chef_intro" },
      ],
    },
    jewel_intro: {
      description: "A priceless jewel has been stolen! Where do you want to start?",
      options: [
        { label: "Inspect the crime scene 🕵️", next: "jewel_scene" },
        { label: "Question the museum guard 🚨", next: "jewel_guard" },
      ],
    },
    jewel_scene: {
      description: "You see muddy footprints leading outside and broken glass.",
      options: [
        { label: "Follow the footprints 👣", next: "jewel_footprints" },
        { label: "Call forensics 🧪", next: "jewel_forensics" },
      ],
    },
    jewel_guard: {
      description: "The guard reports hearing footsteps before falling asleep.",
      options: [
        { label: "Inspect the security cameras 📹", next: "jewel_cameras" },
        { label: "Look for clues nearby 🔦", next: "jewel_clues" },
      ],
    },
    jewel_footprints: {
      description: "The footprints lead to the back alley, where you find a torn glove.",
      options: [
        { label: "Inspect the glove 🧤", next: "jewel_glove" },
        { label: "Search the alley further 🔍", next: "jewel_alley" },
      ],
    },
    jewel_forensics: {
      description: "Forensics finds a fingerprint on the glass.",
      options: [
        { label: "Run a fingerprint search 🕵️‍♀️", next: "jewel_results" },
        { label: "Interview staff members 🗣️", next: "jewel_staff" },
      ],
    },
    chef_intro: {
      description: "The town's famous chef disappeared during dinner prep! What do you do?",
      options: [
        { label: "Search the kitchen 🔪", next: "chef_kitchen" },
        { label: "Question the waiter 🍽️", next: "chef_waiter" },
      ],
    },
    chef_kitchen: {
      description: "You find a torn recipe page and a strange smell from the fridge.",
      options: [
        { label: "Read the recipe 📜", next: "chef_recipe" },
        { label: "Check the fridge ❄️", next: "chef_fridge" },
      ],
    },
    chef_waiter: {
      description: "The waiter seems nervous but mentions a late delivery.",
      options: [
        { label: "Follow up on the delivery 🚚", next: "chef_delivery" },
        { label: "Press the waiter for more info 🤔", next: "chef_interrogate" },
      ],
    },
    chef_recipe: {
      description: "The recipe mentions a rare spice last delivered yesterday.",
      options: [
        { label: "Check the spice cabinet 🧂", next: "chef_spice" },
        { label: "Look for delivery records 📋", next: "chef_delivery" },
      ],
    },
    chef_fridge: {
      description: "Inside the fridge, you find a note saying 'Meet at midnight.'",
      options: [
        { label: "Investigate the meeting spot 🌃", next: "chef_meeting" },
        { label: "Call for backup 🚔", next: "chef_backup" },
      ],
    },
  };
  
  // State for current scene
  let currentScene = "start";
  
  // Function to render a scene dynamically
  function renderScene(sceneId) {
    const scene = scenes[sceneId];
    const description = document.getElementById("scene-description");
    const optionsContainer = document.getElementById("options-container");
  
    // Update description
    description.innerText = scene.description;
  
    // Clear previous buttons
    optionsContainer.innerHTML = "";
  
    // Add new options as buttons
    scene.options.forEach((option) => {
      const button = document.createElement("button");
      button.innerText = option.label;
  
      // Event listener for next scene
      button.addEventListener("click", () => {
        renderScene(option.next);
      });
  
      optionsContainer.appendChild(button);
    });
  
    // Show restart button only at key endings
    const restartBtn = document.getElementById("restart-btn");
    if (["jewel_glove", "chef_meeting", "chef_spice"].includes(sceneId)) {
      restartBtn.style.display = "block";
    } else {
      restartBtn.style.display = "none";
    }
  }
  
  // Event listener for restart button
  document.getElementById("restart-btn").addEventListener("click", () => {
    currentScene = "start";
    renderScene(currentScene);
  });
  
  // Initial render
  renderScene(currentScene);
  