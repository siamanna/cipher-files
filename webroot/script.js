const scenes = {
    start: {
      description: "Which mystery case would you like to solve?",
      options: [
        { label: "🔍 The Stolen Jewel", next: "jewel_intro" },
        { label: "👨‍🍳 The Missing Chef", next: "chef_intro" },
      ],
    },
  
    // Jewel Mystery with Cryptographic Challenges
    jewel_intro: {
      description: "A priceless jewel has been stolen! Where do you want to start?",
      options: [
        { label: "Inspect the crime scene 🕵️", next: "jewel_scene" },
        { label: "Question the museum guard 🚨", next: "jewel_guard" },
      ],
    },
    jewel_scene: {
      description: "A note near the broken glass reads: '.. / -- .. ... ... / -.-- --- ..-'. (Hint: Morse Code)",
      type: "input",
      validation: (input) => input.toLowerCase() === "i miss you",
      successScene: "jewel_glove",
      failureMessage: "The note doesn't make sense yet. Try decoding it again.",
    },
    jewel_glove: {
      description: "The glove has a cryptic text: 'TWFrZVRvV2lu'. Decode it (Hint: Base64).",
      type: "input",
      validation: (input) => input === "MakeToWin",
      successScene: "jewel_safe",
      failureMessage: "The text seems wrong. Use a Base64 decoder!",
    },
    jewel_safe: {
      description:
        "The glove also contains a safe note with a hashed password: '5f4dcc3b5aa765d61d8327deb882cf99'.\n(Hint: Try common password lists).",
      type: "input",
      validation: (input) => input === "password",
      successScene: "jewel_suspect",
      failureMessage: "This hash matches a common password. Check RockYou.txt or common lists!",
    },
    jewel_suspect: {
      description: "The decoded clues led you to Mark Turner, a disgruntled ex-employee!",
      options: [{ label: "Confront Mark Turner 🛑", next: "jewel_solved" }],
    },
    jewel_solved: {
      description: "🎉 You caught the thief and retrieved the stolen jewel. Case closed!",
      isEnding: true,
    },
  
    // Chef Mystery with Cryptographic Challenges
    chef_intro: {
      description: "The famous chef disappeared during dinner prep. Where do you start?",
      options: [
        { label: "Search the kitchen 🔪", next: "chef_kitchen" },
        { label: "Question the waiter 🍽️", next: "chef_waiter" },
      ],
    },
    chef_kitchen: {
      description: "A torn recipe reveals: 'N znva cnffjbeq vf ZVQABG'. (Hint: Caesar Cipher - Shift 13).",
      type: "input",
      validation: (input) => input.toLowerCase() === "a main password is MIDNIGHT".toLowerCase(),
      successScene: "chef_delivery",
      failureMessage: "Not quite right. Use ROT13 to decrypt it.",
    },
    chef_delivery: {
      description: "The waiter confesses that the chef is held at Pier 7. But you'll need the secret passphrase: 'V2VsY29tZQ==' (Hint: Base64).",
      type: "input",
      validation: (input) => input === "Welcome",
      successScene: "chef_pier",
      failureMessage: "Wrong passphrase! Decode the Base64 properly.",
    },
    chef_pier: {
      description: "At Pier 7, you spot the kidnappers with the chef! Ready for action.",
      options: [{ label: "Rescue the chef 🛟", next: "chef_solved" }],
    },
    chef_solved: {
      description: "🎉 You saved the chef and arrested the kidnappers. The town celebrates your heroism!",
      isEnding: true,
    },
  };
  
  // Core Game Logic
  function renderScene(sceneId) {
    const scene = scenes[sceneId];
    const description = document.getElementById("scene-description");
    const optionsContainer = document.getElementById("options-container");
    const restartBtn = document.getElementById("restart-btn");
  
    description.innerText = scene.description;
    optionsContainer.innerHTML = "";
    restartBtn.style.display = scene.isEnding ? "block" : "none";
  
    if (scene.type === "input") {
      const input = document.createElement("input");
      input.placeholder = "Enter your answer...";
      input.id = "player-input";
  
      const submitBtn = document.createElement("button");
      submitBtn.innerText = "Submit";
      submitBtn.addEventListener("click", () => {
        const playerAnswer = document.getElementById("player-input").value;
        if (scene.validation(playerAnswer)) {
          renderScene(scene.successScene);
        } else {
          alert(scene.failureMessage);
        }
      });
  
      optionsContainer.appendChild(input);
      optionsContainer.appendChild(submitBtn);
    } else {
      scene.options?.forEach((option) => {
        const button = document.createElement("button");
        button.innerText = option.label;
        button.addEventListener("click", () => renderScene(option.next));
        optionsContainer.appendChild(button);
      });
    }
  }
  
  document.getElementById("restart-btn").addEventListener("click", () => {
    renderScene("start");
  });
  
  renderScene("start");
  