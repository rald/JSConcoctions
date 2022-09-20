var AudioContext = window.AudioContext || window.webkitAudioContext;

var audctx = new AudioContext();
var oscillator = null;

// Create a gain, which will allow us to control the volume
var gain = audctx.createGain();
var finish = audctx.destination;

// Connect the gain to the audio context
gain.connect(finish);
gain.gain.setValueAtTime(0.0125,audctx.currentTime);

function play(frequency) {
	if (audctx && !oscillator) {
		oscillator = audctx.createOscillator();
		
		// Set the frequency
//		oscillator.frequency.setValueAtTime(frequency || 440, audctx.currentTime);

		oscillator.frequency.setValueAtTime(frequency, audctx.currentTime);
			
		// Square wave
		oscillator.type = 'square';
		
		// Connect the gain and start the sound
		oscillator.connect(gain);
		oscillator.start();
	}
}

function stop() {
	if(oscillator) {
		oscillator.stop();
		oscillator.disconnect();
		oscillator = null;
	}
}
