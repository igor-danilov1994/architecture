import {subscribe} from "../../../core/state-manager.js";
import {EVENTS} from "../../../core/consts.js";

export const AudioComponent = () => {
    const catchAudio = new Audio('assets/audio/sounds_catch.wav');
    const mussAudio = new Audio('assets/audio/sounds_miss.mp3');

   subscribe((event) => {
       if(event.name === EVENTS.CATCH_GOOGLE){
           catchAudio.currentTime = 0;
           catchAudio.play()
       }
       if(event.name === EVENTS.GOOGLE_MISS){
           mussAudio.currentTime = 0;
           mussAudio.play()
       }
   })
}


