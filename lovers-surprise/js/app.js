/**
 * =========================================================================
 * 💖 MAIN APPLICATION CONTROLLER (ENHANCED EDITION) 💖
 * =========================================================================
 * Orchestrates:
 * 1. Heartbeat Lock & Aesthetic Ornate Frame Reveal
 * 2. Constellation of Us (Milestones)
 * 3. The Enchanted Flower Garden & Virtual Bouquet
 * 4. Retro Spinning Vinyl Turntable
 * 5. 3D Origami Love Jar (Why I Love You)
 * 6. Dynamic Infinite Moving Photo Reel
 * 7. Couples Telepathy Mini-Game
 * 8. Romantic Pickup Lines & 3D Proposal Stage (Ring Box + Runaway "No")
 * 9. Wax-Sealed Love Letter & Sky Lanterns Finale
 */

document.addEventListener("DOMContentLoaded", () => {
  App.init();
});

const App = {
  currentChapter: 1,
  totalChapters: 10,
  unlockedChapters: new Set([1]),
  currentPin: "",
  openedReasonsCount: 0,
  quizCurrentIndex: 0,
  pickupCurrentIndex: 0,
  bloomedFlowers: new Set(),
  ringBoxOpened: false,

  init() {
    this.renderCustomContent();
    this.initCanvasBackground();
    this.initLockScreen();
    this.initUnlockFrameModal();
    this.initMilestones();
    this.initOurJourney();
    this.initFlowerGarden();
    this.initVinylPlayer();
    this.initOrigamiJar();
    this.initMovingPhotos();
    this.initQuiz();
    this.initPickupAndProposal();
    this.initWaxLetter();
    this.initLanterns();
    this.initNavDock();
    this.initGlobalAudioTrigger();
  },

  // First user interaction politely unlocks Web Audio API
  initGlobalAudioTrigger() {
    const startPrompt = document.getElementById("audioStartPrompt");
    const unlockAudio = () => {
      window.soundEngine.initAudioContext();
      if (!window.soundEngine.isPlaying) {
        window.soundEngine.toggleMusic();
      }
      if (startPrompt) {
        startPrompt.style.opacity = "0";
        setTimeout(() => startPrompt.remove(), 600);
      }
      document.removeEventListener("click", unlockAudio);
      document.removeEventListener("touchstart", unlockAudio);
    };

    document.addEventListener("click", unlockAudio, { once: true });
    document.addEventListener("touchstart", unlockAudio, { once: true });
  },

  // Populate dynamic text from LOVE_CONFIG
  renderCustomContent() {
    document.querySelectorAll(".partner-name").forEach(el => el.textContent = LOVE_CONFIG.partnerName);
    document.querySelectorAll(".partner-nickname").forEach(el => el.textContent = LOVE_CONFIG.partnerNickname);
    document.querySelectorAll(".sender-name").forEach(el => el.textContent = LOVE_CONFIG.senderName);

    const hintEl = document.getElementById("lockHintText");
    if (hintEl) hintEl.textContent = LOVE_CONFIG.secretHint;

    const trackNameEl = document.getElementById("vinylTrackTitle");
    if (trackNameEl) trackNameEl.textContent = LOVE_CONFIG.music.bgmTitle;
  },

  // =========================================================================
  // CHAPTER NAVIGATION
  // =========================================================================
  goToChapter(num) {
    if (num < 1 || num > this.totalChapters) return;

    window.soundEngine.playTapSound();

    const currentEl = document.getElementById(`chapter-${this.currentChapter}`);
    const nextEl = document.getElementById(`chapter-${num}`);

    if (currentEl && nextEl) {
      currentEl.classList.remove("active");
      currentEl.classList.add("fade-out");

      setTimeout(() => {
        currentEl.classList.remove("fade-out");
        nextEl.classList.add("active");
        this.currentChapter = num;
        this.unlockedChapters.add(num);
        this.updateNavDock();
        window.scrollTo({ top: 0, behavior: "smooth" });

        // Special triggers per chapter
        if (num === 10) {
          window.soundEngine.playTrack("letter");
        }
      }, 500);
    }
  },

  initNavDock() {
    const dock = document.getElementById("navDock");
    if (!dock) return;

    dock.querySelectorAll(".nav-item").forEach(btn => {
      btn.addEventListener("click", () => {
        const target = parseInt(btn.getAttribute("data-chapter"));
        if (this.unlockedChapters.has(target)) {
          this.goToChapter(target);
        } else {
          this.showToast("Unlock the story step by step first! 🔐✨");
          window.soundEngine.playErrorSound();
        }
      });
    });
    this.updateNavDock();
  },

  updateNavDock() {
    const dock = document.getElementById("navDock");
    if (!dock) return;

    dock.querySelectorAll(".nav-item").forEach(btn => {
      const ch = parseInt(btn.getAttribute("data-chapter"));
      if (ch === this.currentChapter) {
        btn.classList.add("current");
      } else {
        btn.classList.remove("current");
      }

      if (this.unlockedChapters.has(ch)) {
        btn.classList.remove("locked");
      } else {
        btn.classList.add("locked");
      }
    });
  },

  // =========================================================================
  // 1. HEARTBEAT ANNIVERSARY LOCK & ORNATE FRAME REVEAL
  // =========================================================================
  initLockScreen() {
    const display = document.getElementById("pinDisplay");
    const heartbeatIcon = document.getElementById("heartbeatIcon");
    const keypad = document.getElementById("lockKeypad");

    if (!keypad) return;

    keypad.querySelectorAll(".key-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const val = btn.getAttribute("data-val");
        window.soundEngine.playTapSound();

        if (val === "clear") {
          this.currentPin = "";
          display.textContent = "••••";
          if (heartbeatIcon) heartbeatIcon.style.animationDuration = "1.5s";
          return;
        }

        if (val === "hint") {
          const hintBox = document.getElementById("hintPopup");
          hintBox.classList.toggle("show");
          window.soundEngine.playSparkleSound();
          return;
        }

        if (this.currentPin.length < 4) {
          this.currentPin += val;
          display.textContent = "❤️ ".repeat(this.currentPin.length) + "• ".repeat(4 - this.currentPin.length);

          window.soundEngine.playHeartbeatSound();
          const speed = Math.max(0.4, 1.5 - (this.currentPin.length * 0.28));
          if (heartbeatIcon) heartbeatIcon.style.animationDuration = `${speed}s`;

          if (this.currentPin.length === 4) {
            setTimeout(() => this.checkPin(), 250);
          }
        }
      });
    });
  },

  checkPin() {
    const lockCard = document.getElementById("lockCard");
    const display = document.getElementById("pinDisplay");

    if (this.currentPin === LOVE_CONFIG.specialDate) {
      window.soundEngine.playSuccessSound();
      this.triggerConfetti();
      lockCard.classList.add("unlock-glow");
      display.textContent = "UNLOCKED 💖";

      setTimeout(() => {
        this.showUnlockFrameModal();
      }, 1000);
    } else {
      window.soundEngine.playErrorSound();
      lockCard.classList.add("shake-error");
      display.textContent = "TRY AGAIN 💔";

      setTimeout(() => {
        lockCard.classList.remove("shake-error");
        this.currentPin = "";
        display.textContent = "••••";
        const heartbeatIcon = document.getElementById("heartbeatIcon");
        if (heartbeatIcon) heartbeatIcon.style.animationDuration = "1.5s";
      }, 800);
    }
  },

  initUnlockFrameModal() {
    const frameImg = document.getElementById("unlockFrameImg");
    const frameTitle = document.getElementById("unlockFrameTitle");
    const frameQuote = document.getElementById("unlockFrameQuote");
    const frameBtn = document.getElementById("unlockFrameBtn");

    if (frameImg) frameImg.src = LOVE_CONFIG.unlockFrame.photo;
    if (frameTitle) frameTitle.textContent = LOVE_CONFIG.unlockFrame.title;
    if (frameQuote) frameQuote.textContent = LOVE_CONFIG.unlockFrame.subtitle;
    if (frameBtn) {
      frameBtn.textContent = LOVE_CONFIG.unlockFrame.buttonText;
      frameBtn.addEventListener("click", () => {
        const modal = document.getElementById("unlockFrameModal");
        if (modal) modal.classList.remove("show");
        window.soundEngine.playSparkleSound();
        this.goToChapter(2);
      });
    }
  },

  showUnlockFrameModal() {
    const modal = document.getElementById("unlockFrameModal");
    if (modal) {
      modal.classList.add("show");
      window.soundEngine.playProposalRingFanfare();
      this.triggerConfetti();
    }
  },

  // =========================================================================
  // 2. CONSTELLATION OF US (MILESTONES)
  // =========================================================================
  initMilestones() {
    const container = document.getElementById("milestonesList");
    if (!container) return;

    container.innerHTML = "";
    LOVE_CONFIG.milestones.forEach((m) => {
      const card = document.createElement("div");
      card.className = "milestone-card";
      card.innerHTML = `
        <div class="milestone-badge">
          <span class="star-icon">⭐</span>
          <span class="milestone-date">${m.date}</span>
        </div>
        <div class="milestone-body">
          <div class="milestone-img-wrap">
            <img src="${m.photo}" alt="${m.title}" onerror="this.src='https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500&q=80'">
          </div>
          <div class="milestone-info">
            <h3>${m.title}</h3>
            <p>${m.caption}</p>
          </div>
        </div>
      `;
      card.addEventListener("click", () => {
        window.soundEngine.playSparkleSound();
        card.classList.toggle("expanded");
      });
      container.appendChild(card);
    });
  },

  // =========================================================================
  // OUR JOURNEY SECTION (BOARDING PASS & ROADMAP TO FOREVER)
  // =========================================================================
  initOurJourney() {
    const journeyData = LOVE_CONFIG.ourJourney;
    if (!journeyData) return;

    // Boarding Pass Passenger Details
    const passengerEl = document.getElementById("ticketPassengerName");
    const flightEl = document.getElementById("ticketFlightNo");
    const fromEl = document.getElementById("ticketFrom");
    const toEl = document.getElementById("ticketTo");
    const seatEl = document.getElementById("ticketSeat");
    const dateEl = document.getElementById("ticketDate");
    const stampBtn = document.getElementById("stampTicketBtn");
    const stampSeal = document.getElementById("passportStampSeal");

    if (passengerEl) passengerEl.textContent = `${LOVE_CONFIG.partnerName} & ${LOVE_CONFIG.senderName}`;
    if (flightEl) flightEl.textContent = journeyData.boardingPass.flightNo;
    if (fromEl) fromEl.textContent = journeyData.boardingPass.from;
    if (toEl) toEl.textContent = journeyData.boardingPass.to;
    if (seatEl) seatEl.textContent = journeyData.boardingPass.seat;
    if (dateEl) dateEl.textContent = journeyData.boardingPass.date;

    // Stamp Boarding Pass Interaction
    if (stampBtn && stampSeal) {
      stampBtn.addEventListener("click", () => {
        window.soundEngine.playStampSound();
        stampSeal.classList.add("stamped");
        this.triggerConfetti();
        this.showToast("Pass Stamped! Destination: Forever Together 💍♾️");
        stampBtn.disabled = true;
        stampBtn.innerHTML = "Stamped & Sealed For Eternity ✨";
      });
    }

    // Render Roadmap Stations
    const stationsContainer = document.getElementById("roadmapStations");
    if (stationsContainer) {
      stationsContainer.innerHTML = "";
      journeyData.stations.forEach(station => {
        const card = document.createElement("div");
        card.className = "roadmap-station-card";
        card.innerHTML = `
          <div class="station-pin">${station.icon}</div>
          <div class="station-content">
            <h3>${station.name} <span class="station-badge">${station.highlight}</span></h3>
            <p>${station.desc}</p>
          </div>
        `;
        card.addEventListener("click", () => {
          window.soundEngine.playSparkleSound();
          card.classList.toggle("highlighted");
        });
        stationsContainer.appendChild(card);
      });
    }

    // Render Bucket List Pledges
    const bucketContainer = document.getElementById("bucketListGrid");
    if (bucketContainer) {
      bucketContainer.innerHTML = "";
      journeyData.bucketList.forEach(item => {
        const itemCard = document.createElement("div");
        itemCard.className = "bucket-item-card";
        itemCard.innerHTML = `
          <span>${item.title}</span>
          <span class="bucket-pledge-badge">Click to Pledge 🤍</span>
        `;
        itemCard.addEventListener("click", () => {
          window.soundEngine.playSparkleSound();
          itemCard.classList.toggle("pledged");
          const badge = itemCard.querySelector(".bucket-pledge-badge");
          if (itemCard.classList.contains("pledged")) {
            badge.textContent = "Pledged Together 💖";
            this.triggerConfetti();
          } else {
            badge.textContent = "Click to Pledge 🤍";
          }
        });
        bucketContainer.appendChild(itemCard);
      });
    }
  },

  // =========================================================================
  // 3. THE ENCHANTED FLOWER GARDEN & VIRTUAL BOUQUET
  // =========================================================================
  initFlowerGarden() {
    const grid = document.getElementById("flowerGardenGrid");
    const statusText = document.getElementById("bouquetStatusText");
    const giftBtn = document.getElementById("giftBouquetBtn");

    if (!grid) return;

    grid.innerHTML = "";
    LOVE_CONFIG.flowerGarden.flowers.forEach(flower => {
      const card = document.createElement("div");
      card.className = "flower-card";
      card.setAttribute("data-id", flower.id);
      card.innerHTML = `
        <div class="flower-icon-wrap">${flower.name.split(" ")[flower.name.split(" ").length - 1]}</div>
        <h4 class="flower-name">${flower.name}</h4>
        <span class="flower-meaning-badge">${flower.meaning}</span>
      `;

      card.addEventListener("click", () => {
        this.openFlowerDetail(flower, card);
      });

      grid.appendChild(card);
    });

    if (giftBtn) {
      giftBtn.addEventListener("click", () => {
        window.soundEngine.playProposalRingFanfare();
        this.triggerConfetti();
        this.showToast(LOVE_CONFIG.flowerGarden.bouquetGiftMessage);
      });
    }
  },

  openFlowerDetail(flower, cardEl) {
    window.soundEngine.playFlowerBloomSound();
    this.bloomedFlowers.add(flower.id);
    cardEl.classList.add("bloomed");

    const statusText = document.getElementById("bouquetStatusText");
    if (statusText) {
      statusText.innerHTML = `💐 Collected: <strong>${this.bloomedFlowers.size} / ${LOVE_CONFIG.flowerGarden.flowers.length}</strong> flowers`;
    }

    const modal = document.getElementById("flowerDetailModal");
    const iconEl = document.getElementById("flowerDetailIcon");
    const titleEl = document.getElementById("flowerDetailTitle");
    const meaningEl = document.getElementById("flowerDetailMeaning");
    const quoteEl = document.getElementById("flowerDetailQuote");

    if (modal) {
      iconEl.textContent = flower.name.split(" ")[flower.name.split(" ").length - 1];
      titleEl.textContent = flower.name;
      meaningEl.textContent = `Symbolizes: ${flower.meaning}`;
      quoteEl.textContent = `“${flower.message}”`;
      modal.classList.add("show");
    }
  },

  closeFlowerDetail() {
    const modal = document.getElementById("flowerDetailModal");
    if (modal) modal.classList.remove("show");
    window.soundEngine.playTapSound();
  },

  // =========================================================================
  // 4. RETRO VINYL RECORD PLAYER
  // =========================================================================
  initVinylPlayer() {
    const disc = document.getElementById("vinylDisc");
    const arm = document.getElementById("turntableArm");
    const playBtn = document.getElementById("vinylPlayBtn");

    if (!playBtn) return;

    playBtn.addEventListener("click", () => {
      const isPlaying = window.soundEngine.toggleMusic();
      if (isPlaying) {
        disc.classList.add("spinning");
        arm.classList.add("playing");
        playBtn.innerHTML = "⏸️ Pause Our Song";
      } else {
        disc.classList.remove("spinning");
        arm.classList.remove("playing");
        playBtn.innerHTML = "▶️ Play Our Song";
      }
    });
  },

  // =========================================================================
  // 5. 3D ORIGAMI LOVE JAR
  // =========================================================================
  initOrigamiJar() {
    const jar = document.getElementById("loveJar");
    const counter = document.getElementById("jarCounter");
    const noteModal = document.getElementById("reasonModal");
    const noteContent = document.getElementById("reasonModalText");

    if (!jar) return;

    jar.addEventListener("click", () => {
      jar.classList.add("shake-jar");
      window.soundEngine.playPaperRustle();

      setTimeout(() => {
        jar.classList.remove("shake-jar");
        const randomIndex = Math.floor(Math.random() * LOVE_CONFIG.reasons.length);
        const reason = LOVE_CONFIG.reasons[randomIndex];

        this.openedReasonsCount++;
        if (counter) counter.textContent = `Opened: ${this.openedReasonsCount} / ${LOVE_CONFIG.reasons.length}`;

        if (noteContent && noteModal) {
          noteContent.innerHTML = `
            <div class="reason-quote-mark">“</div>
            <p>${reason}</p>
            <div class="reason-footer">Reason #${randomIndex + 1} why I adore you 💖</div>
          `;
          noteModal.classList.add("show");
          window.soundEngine.playSparkleSound();
        }
      }, 400);
    });
  },

  closeReasonModal() {
    const modal = document.getElementById("reasonModal");
    if (modal) modal.classList.remove("show");
    window.soundEngine.playTapSound();
  },

  // =========================================================================
  // 6. DYNAMIC MOVING PHOTOS INFINITE FILMSTRIP REEL
  // =========================================================================
  initMovingPhotos() {
    const trackLeft = document.getElementById("movingTrackLeft");
    const trackRight = document.getElementById("movingTrackRight");

    if (!trackLeft || !trackRight) return;

    const photos = LOVE_CONFIG.movingPhotos;
    const half = Math.ceil(photos.length / 2);
    const row1 = photos.slice(0, half);
    const row2 = photos.slice(half);

    // Duplicate arrays to create a flawless infinite CSS marquee loop
    const buildTrack = (arr, container) => {
      container.innerHTML = "";
      const duplicated = [...arr, ...arr];
      duplicated.forEach(item => {
        const card = document.createElement("div");
        card.className = "moving-photo-card";
        card.innerHTML = `
          <div class="moving-photo-img">
            <img src="${item.image}" alt="Memory" onerror="this.src='https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500&q=80'">
          </div>
          <div class="moving-photo-caption">${item.caption}</div>
        `;
        card.addEventListener("click", () => {
          this.openLightbox(item.image, item.caption);
        });
        container.appendChild(card);
      });
    };

    buildTrack(row1, trackLeft);
    buildTrack(row2, trackRight);
  },

  // =========================================================================
  // 7. COUPLES TELEPATHY GAME
  // =========================================================================
  initQuiz() {
    this.renderQuizQuestion();
  },

  renderQuizQuestion() {
    const container = document.getElementById("quizCard");
    if (!container) return;

    if (this.quizCurrentIndex >= LOVE_CONFIG.quiz.length) {
      container.innerHTML = `
        <div class="quiz-complete-card">
          <div class="quiz-crown">👑 1000% SOULMATES</div>
          <h2>Destined For Eternity!</h2>
          <p>Unga answer ethuva irundhalum, result onnu thaan: Namba rendu perum serndhadhu thaan ulagathula best coincidence! 🫀✨</p>
          <button class="action-btn" onclick="App.goToChapter(9)">Proceed To The Big Question 💍✨</button>
        </div>
      `;
      window.soundEngine.playSuccessSound();
      this.triggerConfetti();
      return;
    }

    const q = LOVE_CONFIG.quiz[this.quizCurrentIndex];
    container.innerHTML = `
      <div class="quiz-header">
        <span class="quiz-step">Question ${this.quizCurrentIndex + 1} of ${LOVE_CONFIG.quiz.length}</span>
        <h3>${q.question}</h3>
      </div>
      <div class="quiz-options">
        ${q.options.map((opt, i) => `
          <button class="quiz-opt-btn" onclick="App.selectQuizOption(${i})">
            ${opt.text}
          </button>
        `).join("")}
      </div>
      <div id="quizReaction" class="quiz-reaction"></div>
    `;
  },

  selectQuizOption(optIndex) {
    const q = LOVE_CONFIG.quiz[this.quizCurrentIndex];
    const opt = q.options[optIndex];
    const reactionBox = document.getElementById("quizReaction");

    window.soundEngine.playSparkleSound();

    if (reactionBox) {
      reactionBox.innerHTML = `
        <div class="reaction-bubble">
          <p>${opt.reaction}</p>
          <button class="next-quiz-btn" onclick="App.nextQuizQuestion()">Next Question ➡️</button>
        </div>
      `;
      reactionBox.classList.add("show");
    }
  },

  nextQuizQuestion() {
    window.soundEngine.playTapSound();
    this.quizCurrentIndex++;
    this.renderQuizQuestion();
  },

  // =========================================================================
  // 8. PICKUP LINES & 3D RING PROPOSAL STAGE
  // =========================================================================
  initPickupAndProposal() {
    this.renderPickupLine();

    const ringBox = document.getElementById("ringBoxWrapper");
    const yesBtn = document.getElementById("proposalYesBtn");
    const noBtn = document.getElementById("proposalNoBtn");

    // 3D Ring Box opening
    if (ringBox) {
      ringBox.addEventListener("click", () => {
        if (!this.ringBoxOpened) {
          ringBox.classList.add("opened");
          this.ringBoxOpened = true;
          window.soundEngine.playProposalRingFanfare();
          this.triggerConfetti();
        }
      });
    }

    // Runaway "No" Button (Escapes mouse and touch)
    if (noBtn) {
      const escapeNo = (e) => {
        e.preventDefault();
        window.soundEngine.playTapSound();

        const x = (Math.random() - 0.5) * 260;
        const y = (Math.random() - 0.5) * 120;

        noBtn.style.transform = `translate(${x}px, ${y}px)`;

        const randomText = LOVE_CONFIG.proposal.noResponses[
          Math.floor(Math.random() * LOVE_CONFIG.proposal.noResponses.length)
        ];
        noBtn.textContent = randomText;
      };

      noBtn.addEventListener("mouseover", escapeNo);
      noBtn.addEventListener("touchstart", escapeNo, { passive: false });
    }

    // YES Proposal acceptance
    if (yesBtn) {
      yesBtn.addEventListener("click", () => {
        window.soundEngine.playProposalRingFanfare();
        this.triggerConfetti();
        this.triggerConfetti();

        const modal = document.getElementById("proposalSuccessModal");
        if (modal) modal.classList.add("show");
      });
    }
  },

  renderPickupLine() {
    const lineEl = document.getElementById("pickupLineText");
    const punchlineEl = document.getElementById("pickupPunchlineText");
    const counterEl = document.getElementById("pickupCounterText");

    if (!lineEl) return;

    const current = LOVE_CONFIG.pickupLines[this.pickupCurrentIndex];
    lineEl.textContent = current.line;
    punchlineEl.textContent = current.punchline;
    if (counterEl) {
      counterEl.textContent = `Pickup Line ${this.pickupCurrentIndex + 1} of ${LOVE_CONFIG.pickupLines.length}`;
    }
  },

  nextPickupLine() {
    window.soundEngine.playSparkleSound();
    this.pickupCurrentIndex = (this.pickupCurrentIndex + 1) % LOVE_CONFIG.pickupLines.length;
    this.renderPickupLine();
  },

  prevPickupLine() {
    window.soundEngine.playTapSound();
    this.pickupCurrentIndex = (this.pickupCurrentIndex - 1 + LOVE_CONFIG.pickupLines.length) % LOVE_CONFIG.pickupLines.length;
    this.renderPickupLine();
  },

  closeProposalModal() {
    const modal = document.getElementById("proposalSuccessModal");
    if (modal) modal.classList.remove("show");
    this.goToChapter(10);
  },

  // =========================================================================
  // 9. WAX SEAL LETTER & SKY LANTERNS FINALE
  // =========================================================================
  initWaxLetter() {
    const seal = document.getElementById("waxSeal");
    const envelope = document.getElementById("letterEnvelope");
    const paper = document.getElementById("letterParchment");

    if (!seal) return;

    seal.addEventListener("click", () => {
      window.soundEngine.playPaperRustle();
      seal.classList.add("cracked");

      setTimeout(() => {
        envelope.classList.add("opened");
        paper.classList.add("unfolded");
        window.soundEngine.playTrack("letter");
        this.typewriterLetter();
      }, 700);
    });
  },

  typewriterLetter() {
    const bodyEl = document.getElementById("letterBodyText");
    const salutationEl = document.getElementById("letterSalutation");
    const signatureEl = document.getElementById("letterSignature");

    if (!bodyEl) return;

    if (salutationEl) salutationEl.textContent = LOVE_CONFIG.letter.salutation;

    const fullText = LOVE_CONFIG.letter.body;
    bodyEl.textContent = "";
    let charIndex = 0;

    const timer = setInterval(() => {
      if (charIndex < fullText.length) {
        bodyEl.textContent += fullText.charAt(charIndex);
        charIndex++;
      } else {
        clearInterval(timer);
        if (signatureEl) {
          signatureEl.innerHTML = `
            <div>${LOVE_CONFIG.letter.signature}</div>
            <div class="signature-name">${LOVE_CONFIG.senderName} 💖</div>
          `;
          signatureEl.classList.add("show");
        }
        const lanternPrompt = document.getElementById("lanternPromptArea");
        if (lanternPrompt) lanternPrompt.classList.add("show");
      }
    }, 28);
  },

  initLanterns() {
    const launchBtn = document.getElementById("launchLanternBtn");
    if (!launchBtn) return;

    launchBtn.addEventListener("click", () => {
      window.soundEngine.playSuccessSound();
      this.triggerConfetti();
      this.spawnLanternsSwarm();
      this.showToast("Your lantern has carried our wish to the stars! 🏮✨");
      launchBtn.disabled = true;
      launchBtn.textContent = "Wish Sent To The Heavens 💖🏮";
    });
  },

  spawnLanternsSwarm() {
    const sky = document.getElementById("lanternSky");
    if (!sky) return;

    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const lantern = document.createElement("div");
        lantern.className = "floating-lantern";
        lantern.style.left = `${Math.random() * 90 + 5}%`;
        lantern.style.animationDuration = `${Math.random() * 5 + 8}s`;
        lantern.style.transform = `scale(${Math.random() * 0.5 + 0.7})`;
        lantern.innerHTML = `
          <div class="lantern-glow"></div>
          <div class="lantern-body">🏮</div>
        `;
        sky.appendChild(lantern);

        setTimeout(() => lantern.remove(), 14000);
      }, i * 380);
    }
  },

  // =========================================================================
  // LIGHTBOX MODAL
  // =========================================================================
  openLightbox(image, text) {
    window.soundEngine.playSparkleSound();
    const lightbox = document.getElementById("imageLightbox");
    const img = document.getElementById("lightboxImg");
    const caption = document.getElementById("lightboxText");

    if (lightbox && img && caption) {
      img.src = image;
      caption.textContent = text;
      lightbox.classList.add("show");
    }
  },

  closeLightbox() {
    const lightbox = document.getElementById("imageLightbox");
    if (lightbox) lightbox.classList.remove("show");
    window.soundEngine.playTapSound();
  },

  // =========================================================================
  // BACKGROUND PARTICLES & DRIFTING ROSE PETALS
  // =========================================================================
  initCanvasBackground() {
    const canvas = document.getElementById("bgCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const count = 65;

    for (let i = 0; i < count; i++) {
      const isPetal = Math.random() > 0.6;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: isPetal ? Math.random() * 4 + 3 : Math.random() * 1.8 + 0.5,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: isPetal ? Math.random() * 0.8 + 0.4 : -Math.random() * 0.4 - 0.1,
        alpha: Math.random() * 0.7 + 0.3,
        isPetal: isPetal,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.03
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotSpeed;

        if (p.isPetal) {
          if (p.y > height + 20) {
            p.y = -20;
            p.x = Math.random() * width;
          }
        } else {
          if (p.y < 0) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
        }

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        if (p.isPetal) {
          // Draw subtle petal oval
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.fillStyle = `rgba(244, 63, 94, ${p.alpha * 0.75})`;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.radius, p.radius * 0.55, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else {
          ctx.fillStyle = `rgba(255, 237, 213, ${p.alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      requestAnimationFrame(animate);
    }
    animate();
  },

  // Notification Toast Helper
  showToast(msg) {
    const toast = document.getElementById("appToast");
    if (toast) {
      toast.textContent = msg;
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 3500);
    }
  },

  // Confetti Burst
  triggerConfetti() {
    for (let i = 0; i < 45; i++) {
      const bit = document.createElement("div");
      bit.className = "confetti-piece";
      bit.style.left = `${Math.random() * 100}vw`;
      bit.style.backgroundColor = ["#f43f5e", "#fb7185", "#fbbf24", "#38bdf8", "#fde047", "#ffffff"][Math.floor(Math.random() * 6)];
      bit.style.animationDuration = `${Math.random() * 2 + 2}s`;
      document.body.appendChild(bit);
      setTimeout(() => bit.remove(), 4000);
    }
  }
};
