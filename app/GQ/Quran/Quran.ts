
declare var Quran: any;

export interface Quran {
    surah: {
        detail(surah: number): Array<{start: number, ayahs: number, order: number, rukus: number, arabic_name: string, english_name: string, english_meaning: string, type: string}>;
    }
}