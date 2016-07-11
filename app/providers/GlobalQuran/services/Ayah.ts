interface ayah {
    id: number;
    surah: number;
    ayah: number;
    verse: string;
}

export class Ayah {

    verseNo: number;
    surahNo: number;
    ayahNo: number;
    text: string;

    constructor(ayah: ayah) {
        this.verseNo = ayah.id;
        this.surahNo = ayah.surah;
        this.ayahNo = ayah.ayah;
        this.text = ayah.verse;
    }
}
