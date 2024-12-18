const scenes = {
    start: {
      description: "Which mystery case would you like to solve?",
      options: [
        { label: "🔍 The Stolen Jewel", next: "jewel_intro" },
        { label: "👨‍🍳 The Missing Chef", next: "chef_intro" },
      ],
    },
  
    // The Stolen Jewel Mystery
    jewel_intro: {
      description: "A priceless jewel has been stolen! Where do you want to start?",
      options: [
        { label: "Inspect the crime scene 🕵️", next: "jewel_scene" },
        { label: "Question the museum guard 🚨", next: "jewel_guard" },
      ],
    },
    jewel_scene: {
      description: "You find muddy footprints leading to a back alley and a broken glass display.",
      options: [
        { label: "Follow the footprints 👣", next: "jewel_footprints" },
        { label: "Call forensics 🧪", next: "jewel_forensics" },
      ],
    },
    jewel_guard: {
      description: "The guard nervously mentions faint footsteps before falling asleep.",
      options: [
        { label: "Inspect the security footage 📹", next: "jewel_cameras" },
        { label: "Search the perimeter 🔦", next: "jewel_footprints" },
      ],
    },
    jewel_footprints: {
      description: "The footprints lead to the back alley, where you find a torn glove.",
      options: [
        { label: "Inspect the glove 🧤", next: "jewel_glove" },
        { label: "Search the alley further 🔍", next: "jewel_alley" },
      ],
    },
    jewel_glove: {
      description: "The glove has initials embroidered: 'M.T.' It might be a clue.",
      options: [
        { label: "Trace the initials 🕵️‍♂️", next: "jewel_suspect" },
      ],
    },
    jewel_alley: {
      description: "Further down the alley, you find a witness who saw someone running.",
      options: [
        { label: "Question the witness 👤", next: "jewel_witness" },
      ],
    },
    jewel_witness: {
      description: "The witness describes someone in a museum uniform.",
      options: [
        { label: "Cross-check museum staff records 📋", next: "jewel_suspect" },
      ],
    },
    jewel_cameras: {
      description: "The footage shows someone in a museum uniform sneaking out with the jewel.",
      options: [
        { label: "Trace the uniform back to the suspect 🚨", next: "jewel_suspect" },
      ],
    },
    jewel_suspect: {
      description: "You identify the thief as Mark Turner, a disgruntled former employee!",
      options: [
        { label: "Confront the suspect 🛑", next: "jewel_solved" },
      ],
    },
    jewel_solved: {
      description: "🎉 You recovered the stolen jewel and arrested the thief. Great job, Detective!",
      options: [],
      isEnding: true,
    },
  
    // The Missing Chef Mystery
    chef_intro: {
      description: "The town's famous chef disappeared during dinner prep! Where do you start?",
      options: [
        { label: "Search the kitchen 🔪", next: "chef_kitchen" },
        { label: "Question the waiter 🍽️", next: "chef_waiter" },
      ],
    },
    chef_kitchen: {
      description: "The kitchen is spotless except for a torn recipe page.",
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
      description: "The recipe notes mention a 'meeting at midnight near the pier.'",
      options: [
        { label: "Go to the pier 🌃", next: "chef_pier" },
      ],
    },
    chef_fridge: {
      description: "A note in the fridge says: 'Midnight at Pier 7.'",
      options: [
        { label: "Head to Pier 7 🌉", next: "chef_pier" },
      ],
    },
    chef_delivery: {
      description: "Delivery logs show a suspicious order sent to an abandoned warehouse.",
      options: [
        { label: "Go to the warehouse 🏚️", next: "chef_warehouse" },
      ],
    },
    chef_interrogate: {
      description: "The waiter confesses the chef was taken by shady figures to a warehouse.",
      options: [
        { label: "Investigate the warehouse 🕵️", next: "chef_warehouse" },
      ],
    },
    chef_pier: {
      description: "At the pier, you spot the chef being held hostage by two culprits.",
      options: [
        { label: "Rescue the chef 🛟", next: "chef_solved" },
      ],
    },
    chef_warehouse: {
      description: "Inside the warehouse, you find the chef tied up!",
      options: [
        { label: "Free the chef 🛟", next: "chef_solved" },
      ],
    },
    chef_solved: {
      description: "🎉 You saved the chef and arrested the kidnappers. The town is grateful!",
      options: [],
      isEnding: true,
    },
  };
  
  // Main logic to render scenes
  function renderScene(sceneId) {
    const scene = scenes[sceneId];
    const description = document.getElementById("scene-description");
    const optionsContainer = document.getElementById("options-container");
    const restartBtn = document.getElementById("restart-btn");
  
    description.innerText = scene.description;
    optionsContainer.innerHTML = ""; // Clear previous options
  
    if (scene.isEnding) {
      restartBtn.style.display = "block"; // Show restart button
    } else {
      restartBtn.style.display = "none";
    }
  
    scene.options.forEach((option) => {
      const button = document.createElement("button");
      button.innerText = option.label;
      button.addEventListener("click", () => renderScene(option.next));
      optionsContainer.appendChild(button);
    });
  }
  
  document.getElementById("restart-btn").addEventListener("click", () => {
    renderScene("start");
  });
  
  renderScene("start");
  