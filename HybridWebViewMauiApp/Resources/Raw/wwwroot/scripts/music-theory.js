// مثال على مكتبة نظرية الموسيقى
// يمكن استبدالها بـ Tone.js أو أي مكتبة موسيقى حقيقية

window.MusicTheory = {
    
    // النوتات الموسيقية
    notes: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
    
    // السلالم الموسيقية
    scales: {
        major: [0, 2, 4, 5, 7, 9, 11],
        minor: [0, 2, 3, 5, 7, 8, 10],
        pentatonic: [0, 2, 4, 7, 9],
        blues: [0, 3, 5, 6, 7, 10],
        chromatic: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    },
    
    // الكوردات
    chords: {
        major: [0, 4, 7],
        minor: [0, 3, 7],
        diminished: [0, 3, 6],
        augmented: [0, 4, 8],
        major7: [0, 4, 7, 11],
        minor7: [0, 3, 7, 10],
        dominant7: [0, 4, 7, 10]
    },
    
    // الحصول على السلم الموسيقي
    getScale: function(root, scaleType) {
        const rootIndex = this.notes.indexOf(root);
        if (rootIndex === -1) return null;
        
        const scaleIntervals = this.scales[scaleType] || this.scales.major;
        const scale = [];
        
        for (let interval of scaleIntervals) {
            const noteIndex = (rootIndex + interval) % 12;
            scale.push(this.notes[noteIndex]);
        }
        
        return scale;
    },
    
    // الحصول على الكورد
    getChord: function(root, chordType) {
        const rootIndex = this.notes.indexOf(root);
        if (rootIndex === -1) return null;
        
        const chordIntervals = this.chords[chordType] || this.chords.major;
        const chord = [];
        
        for (let interval of chordIntervals) {
            const noteIndex = (rootIndex + interval) % 12;
            chord.push(this.notes[noteIndex]);
        }
        
        return chord;
    },
    
    // تحليل الكورد
    analyzeChord: function(notes) {
        // تحديد الجذر المحتمل
        const root = notes[0];
        
        // حساب الفترات
        const rootIndex = this.notes.indexOf(root);
        const intervals = notes.map(note => {
            const noteIndex = this.notes.indexOf(note);
            return (noteIndex - rootIndex + 12) % 12;
        });
        
        // تحديد نوع الكورد
        let chordType = 'unknown';
        for (let [type, pattern] of Object.entries(this.chords)) {
            if (JSON.stringify(intervals.sort()) === JSON.stringify(pattern.sort())) {
                chordType = type;
                break;
            }
        }
        
        return {
            root: root,
            type: chordType,
            notes: notes,
            intervals: intervals
        };
    },
    
    // حساب التردد
    getFrequency: function(note, octave = 4) {
        const A4 = 440; // تردد A4
        const noteIndex = this.notes.indexOf(note.toUpperCase());
        if (noteIndex === -1) return null;
        
        // حساب المسافة من A4
        const halfSteps = noteIndex - 9 + (octave - 4) * 12;
        
        // حساب التردد
        return A4 * Math.pow(2, halfSteps / 12);
    },
    
    // تحويل التردد إلى نوتة
    frequencyToNote: function(frequency) {
        const A4 = 440;
        const halfSteps = 12 * Math.log2(frequency / A4);
        const noteIndex = Math.round(halfSteps + 9) % 12;
        const octave = Math.floor((halfSteps + 9) / 12) + 4;
        
        return {
            note: this.notes[noteIndex],
            octave: octave,
            frequency: frequency
        };
    }
};

// ==========================================
// دوال للتواصل مع C#
// ==========================================

window.MusicEngine = {
    
    // الحصول على سلم موسيقي
    getMusicalScale: function(root, type) {
        const scale = MusicTheory.getScale(root, type);
        const message = `SCALE:${root} ${type} = [${scale.join(', ')}]`;
        window.HybridWebView.SendRawMessage(message);
        return scale;
    },
    
    // الحصول على كورد
    getMusicalChord: function(root, type) {
        const chord = MusicTheory.getChord(root, type);
        const message = `CHORD:${root} ${type} = [${chord.join(', ')}]`;
        window.HybridWebView.SendRawMessage(message);
        return chord;
    },
    
    // تحليل كورد
    analyzeMusicalChord: function(notes) {
        const analysis = MusicTheory.analyzeChord(notes);
        const message = `CHORD_ANALYSIS:${JSON.stringify(analysis)}`;
        window.HybridWebView.SendRawMessage(message);
        return analysis;
    },
    
    // حساب التردد
    calculateFrequency: function(note, octave) {
        const freq = MusicTheory.getFrequency(note, octave);
        const message = `FREQUENCY:${note}${octave} = ${freq.toFixed(2)} Hz`;
        window.HybridWebView.SendRawMessage(message);
        return freq;
    },
    
    // مثال على تشغيل نغمة (محاكاة)
    playSequence: function(notes, tempo = 120) {
        const message = `PLAYING:Sequence [${notes.join(', ')}] at ${tempo} BPM`;
        window.HybridWebView.SendRawMessage(message);
        
        // في التطبيق الحقيقي، يمكن استخدام Web Audio API أو Tone.js
        return {
            notes: notes,
            tempo: tempo,
            duration: (notes.length * 60 / tempo) + ' seconds'
        };
    }
};

console.log('Music Theory Library loaded!');