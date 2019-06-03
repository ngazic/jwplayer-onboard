/*
                  ==============================================
                      --- EDITABLE PART ---
                      edit this object videos id or add
                      as many  new videos you want. You must
                      have to keep your video extension within
                      "id" property.
                  ==============================================
    */
var videoIDs = {
    slo: {
        video_1: {
            id: "CeM08rHL.mp4",
            name: "video_1",
            video_A: {
                id: "1TG2r1OJ.mp4",
                name: "video_A",
                valid: false,
                button: {
                    id: "bnt2",
                    src: "btn-icons/slo/1-2A.svg"
                }
            },
            video_B: {
                id: "s65xR70L.mp4",
                name: "video_B",
                valid: false,
                button: {
                    id: "bnt3",
                    src: "btn-icons/slo/1-2B.svg"
                }
            },
            video_C: {
                id: "5ze3TbUb.mp4",
                name: "video_C",
                valid: true,
                button: {
                    id: "bnt1",
                    src: "btn-icons/slo/1-2C.svg"
                }
            },
            loopVideo: "oxP7ZCbr.mp4",
            class: "slo-loop1"
        },
        video_2: {
            id: "F7q7jzTF.mp4",
            name: "video_1",
            video_A: {
                id: "WLHoy64E.mp4",
                name: "video_A",
                valid: false,
                button: {
                    id: "bnt3",
                    src: "btn-icons/slo/2-2A.svg"
                }
            },
            video_B: {
                id: "ln76Tbhp.mp4",
                name: "video_B",
                valid: false,
                button: {
                    id: "bnt1",
                    src: "btn-icons/slo/2-2B.svg"
                }
            },
            video_C: {
                id: "ZMe4Gj8S.mp4",
                name: "video_C",
                valid: true,
                button: {
                    id: "bnt2",
                    src: "btn-icons/slo/2-2C.svg"
                }
            },
            loopVideo: "QZDOR3rC.mp4",
            class: "slo-loop2"
        },
        video_3: {
            id: "6wJfkIqd.mp4",
            name: "video_1",
            video_A: {
                id: "q8Yds32S.mp4",
                name: "video_A",
                valid: false,
                button: {
                    id: "bnt1",
                    src: "btn-icons/slo/3-2A.svg"
                }
            },
            video_B: {
                id: "6mULKMcT.mp4",
                name: "video_B",
                valid: false,
                button: {
                    id: "bnt2",
                    src: "btn-icons/slo/3-2B.svg"
                }
            },
            video_C: {
                id: "ExjjmzfF.mp4",
                name: "video_C",
                valid: true,
                button: {
                    id: "bnt3",
                    src: "btn-icons/slo/3-2C.svg"
                }
            },
            loopVideo: "eFsifg0A.mp4",
            class: "slo-loop3"
        },
        finalLoop: {
            id: "WyiyA0Vv.mp4"
        }
    },
    class: "final-loop-icon"
};

/*
                ============================================
                        ---  NON EDITABLE PART ---
                        logic for playing videos :
                ============================================
  */

(function() {
    var playerInstance;
    var btnContainer = document.getElementsByClassName("options-container")[0];
    var btn1 = document.getElementsByClassName("btn1")[0];
    var btn2 = document.getElementsByClassName("btn2")[0];
    var btn3 = document.getElementsByClassName("btn3")[0];
    var icon1 = document.getElementById("icon1");
    var icon2 = document.getElementById("icon2");
    var icon3 = document.getElementById("icon3");
    var iconRestart = document.getElementById("restart");
    var isLoopVideoAcive = true;
    var isNotFinalLoop = true;
    var tmpVideosArray = Object.getOwnPropertyNames(videoIDs.slo);
    var tmpVideosArrayIndex = 0;
    var apiRoute = "http://content.jwplatform.com/";
    var playerContainer = null;

    /*
                                ================================
                                        SETUP PLAYER
                                ================================
                                */

    var setupPlayer = function(thisFeed) {
        // Initialize the player
        playerInstance = jwplayer("mediaplayer").setup({
            file: apiRoute + "videos/" + videoIDs.slo.video_1.id + ".mp4",
            wmode: "transparent",
            autostart: false,
            volume: 20,
            image: apiRoute + "/v2/media/CeM08rHL/poster.jpg"

        });
    };

    setupPlayer();

    /*
                               ================================
                                    PLAYER ON COMPLETE EVENT
                               ================================
                               */

    playerInstance.on("complete", function() {
        playerContainer = playerInstance.getContainer();
        playerContainer.appendChild(btnContainer, playerInstance);
        playerContainer.appendChild(iconRestart, playerInstance);
        if (isLoopVideoAcive) {
            if (isNotFinalLoop) {
                playerInstance.load({
                    file: apiRoute + "videos/" + videoIDs["slo"][tmpVideosArray[tmpVideosArrayIndex]].loopVideo
                }).play();
                btnText();
                btnContainer.classList.remove("hidden");
            } else {
                playerInstance.load({
                    file: apiRoute + "videos/" + videoIDs["slo"][tmpVideosArray[tmpVideosArrayIndex]].id
                }).play();
                iconRestart.classList.remove("hidden");
            }
        } else {
            btnContainer.classList.add("hidden");
            playerInstance.load({
                file: apiRoute + "videos/" + videoIDs["slo"][tmpVideosArray[tmpVideosArrayIndex]].id
            }).play();
            isLoopVideoAcive = true;
        }
    });

    btn1.onclick = btnEventCallback;
    btn2.onclick = btnEventCallback;
    btn3.onclick = btnEventCallback;

    /*
                               ================================
                               EVENT CALLBACK FOR BUTTONS
                               ================================
                               */
    function btnEventCallback(e) {
        var el = this;
        var id = el.getAttribute("data-video-id");
        var name = el.getAttribute("data-video-name");
        if (videoIDs["slo"][tmpVideosArray[tmpVideosArrayIndex]][name].valid) {
            tmpVideosArrayIndex++;
            isLoopVideoAcive = false;
        } else {
            isLoopVideoAcive = true;
        }
        playerInstance.load({
            file: apiRoute + "videos/" + id
        }).play();
        btnContainer.classList.toggle("hidden");
        if (tmpVideosArrayIndex == tmpVideosArray.length - 1) {
            isNotFinalLoop = false;
            isLoopVideoAcive = true;
            console.log(tmpVideosArrayIndex);
        }
    }

    /*
                      ================================
                        ADD SVG TO BUTTON
                      ================================
                                */
    function btnText() {
        var optionTxtArray = [
            videoIDs["slo"][tmpVideosArray[tmpVideosArrayIndex]].video_A,
            videoIDs["slo"][tmpVideosArray[tmpVideosArrayIndex]].video_B,
            videoIDs["slo"][tmpVideosArray[tmpVideosArrayIndex]].video_C
        ];
        optionTxtArray.forEach(function(videoOption) {
            if (videoOption.button.id === "bnt1") {
                icon1.src = videoOption.button.src;
                btn1.setAttribute("data-video-id", videoOption.id);
                btn1.setAttribute("data-video-name", videoOption.name);
            } else if (videoOption.button.id === "bnt2") {
                icon2.src = videoOption.button.src;
                btn2.setAttribute("data-video-id", videoOption.id);
                btn2.setAttribute("data-video-name", videoOption.name);
            } else {
                icon3.src = videoOption.button.src;
                btn3.setAttribute("data-video-id", videoOption.id);
                btn3.setAttribute("data-video-name", videoOption.name);
            }
        });
        if (tmpVideosArrayIndex > 0) {
            btnContainer.classList.remove("slo-loop" + tmpVideosArrayIndex);
        }
        var indxIncreased = tmpVideosArrayIndex + 1;
        btnContainer.classList.add("slo-loop" + indxIncreased);
    }

    /**
     * =================================
     *    DISABLE PAUSE VIDEO
     * =================================
     */
    playerInstance.on("click", function() {
        playerInstance.play();
        if (!isNotFinalLoop) {
            btnContainer.classList.remove("slo-loop" + indxIncreased);
            iconRestart.classList.add("hidden");
            tmpVideosArrayIndex = 0;
            playerInstance.load({
                file: apiRoute + "videos/" + videoIDs["slo"][tmpVideosArray[tmpVideosArrayIndex]].id
            }).play();
            isNotFinalLoop = true;
        }
    });
})();