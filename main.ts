//% color=#2c3e50 icon="\uf0ce" block="אוגר נתונים + רדיו"
namespace SmartLogger {

    /**
     * רשום נתונים לאוגר הפנימי ושולח אותם אוטומטית ברדיו
     */
    //% block="רשום נתונים $data"
    //% data.shadow="lists_create_with"
    //% data.defl="smart_log_create_cv"
    export function logAndRadio(data: any[]): void {
        // @ts-ignore
        datalogger.logData(data);

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
     * יוצר זוג של עמודה וערך
     */
    //% block="עמודה $column ערך $value"
    //% blockId=smart_log_create_cv
    export function createCV(column: string, value: any): any {
        // @ts-ignore
        return datalogger.createCV(column, value);
    }

    /**
     * מחיקה
     */
    //% block="מחיקת כל הנתונים"
    export function clearAll(): void {
        // @ts-ignore
        datalogger.deleteLog();
    }
}
