//% color=#2c3e50 icon="\uf0ce" block="אוגר נתונים + רדיו"
namespace SmartLogger {

    /**
     * רושם נתונים לאוגר הפנימי ושולח אותם אוטומטית ברדיו
     */
    //% block="רשום נתונים $data"
    //% data.shadow="lists_create_with"
    //% data.defl="smart_log_create_cv"
    export function logAndRadio(data: any[]): void {
        // רישום לאוגר הפנימי של המיקרוביט
        // @ts-ignore
        datalogger.logData(data);

        // בניית הודעת טקסט לשליחה ברדיו
        let message = "";
        for (let item of data) {
            // @ts-ignore
            message += item.column + ":" + item.value + " ";
        }

        if (message.length > 0) {
            radio.sendString(message.trim());
        }
    }

    /**
     * יוצר זוג של עמודה וערך - מקבל מספרים, טקסט או בלוקים של חיישנים
     */
    //% block="עמודה $column ערך $value"
    //% blockId=smart_log_create_cv
    //% value.shadow=math_number
    export function createCV(column: string, value: any): any {
        // @ts-ignore
        return datalogger.createCV(column, value);
    }

    /**
     * מחיקת כל הנתונים מהזיכרון
     */
    //% block="מחיקת כל הנתונים"
    export function clearAll(): void {
        // @ts-ignore
        datalogger.deleteLog();
    }
}
