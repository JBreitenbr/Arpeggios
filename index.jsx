const { useState, useEffect, useRef } = React;
//import * as Tone from "tone";
export const App = () => {const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(100);

  const synthRef = useRef(null);
  const seqRef = useRef(null);
  useEffect(() => {
    let synth=new Tone.Synth().toDestination(); synthRef.current = synth;
    const notes = ["C4", "E4", "G4", "B4", "C5", "B4", "G4", "E4"];
      const seq = new Tone.Sequence(
      (time, note) => {
        synth.triggerAttackRelease(note, "8n", time);
      },
      notes,
      "8n"
    );

    seqRef.current = seq;
    Tone.Transport.bpm.value = bpm;

    return () => {
      seq.dispose();
      synth.dispose();
      Tone.Transport.stop();
    };
  },[]);
                              useEffect(() => {
    Tone.Transport.bpm.value = bpm;
  }, [bpm]);
    
  const handleToggle = async () => {
    if (!isPlaying) {
      await Tone.start();

      if (seqRef.current) {
        seqRef.current.start(0);
      }

      Tone.Transport.start();
      setIsPlaying(true);
    } else {
      Tone.Transport.stop();
      if (seqRef.current) {
        seqRef.current.stop();
      }
      setIsPlaying(false);
    }
  };                           
  return (
    <main> 
      <h4>Mini-Arpeggiator 🎹</h4>
      <button onClick={handleToggle}>{isPlaying ? "Stop" : "Play"}</button>
    </main>
  )
}
