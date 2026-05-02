//% color=#2c3e50 icon="\uf0ce" block="אוגר נתונים + רדיו"
namespace SmartLogger {

    /**
     * רושם את כל העמודות לאחסון הפנימי ושולח אותן כהודעה אחת ברדיו
     */
    //% block="רשום נתונים $data"
    //% data.shadow="lists_create_with"
    //% data.defl="smart_log_create_cv"
    export function logAndRadio(data: any[]): void {
        // 1. רישום לאוגר הפנימי (עבור קובץ ה-HTM)
        const dl = (datalogger as any);
        dl.logData(data);

        // 2. בניית מחרוזת אחת מכל העמודות ושליחה ברדיו
        let message = "";
        for (let item of data) {
            let column = (item as any).column;
            let value = (item as any).value;
            message += column + ":" + value + " ";
        }

        if (message.length > 0) {
            radio.sendString(message.trim());
        }
    }

    /**
     * יוצר זוג של עמודה וערך (הבלוק שמתחבר לתוך הרשימה)
     */
    //% block="עמודה $column ערך $value"
    //% blockId=smart_log_create_cv
    //% blockHidden=false
    //% value.shadow=math_number
    export function createCV(column: string, value: any): any {
        return (datalogger as any).createCV(column, value);
    }

    /**
     * מחיקת כל הנתונים מהזיכרון
     */
    //% block="מחיקת כל הנתונים"
    export function clearAll(): void {
        (datalogger as any).deleteLog();
    }
}
