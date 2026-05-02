/**
 * שלוחה מותאמת אישית לאגירת נתונים - micro:bit V2
 */
//% color=#2c3e50 icon="\uf0ce" block="אוגר נתונים"
namespace MyDataLogger {

    /**
     * אגירת נתונים באחסון הפנימי של המיקרוביט (קובץ MY_DATA)
     */
    //% block="שמור נתון באחסון פנימי %data"
    export function logInternal(data: string): void {
        datalogger.log(datalogger.createCV("data", data))
    }

    /**
     * שליחת הנתון דרך הרדיו
     */
    //% block="שלח נתון %data ברדיו בקבוצה %group"
    export function sendViaRadio(data: string, group: number): void {
        radio.setGroup(group)
        radio.sendString(data)
    }

    /**
     * אגירת נתונים באחסון חיצוני (Serial/SD)
     */
    //% block="שמור נתון %data באחסון חיצוני"
    export function logExternal(data: string): void {
        serial.writeLine(data)
    }

    /**
     * הצגת נתון על המסך
     */
    //% block="הצג נתון על המסך %data"
    export function displayData(data: string): void {
        basic.showString(data)
    }

    /**
     * מחיקת כל הנתונים מהזיכרון הפנימי
     */
    //% block="מחק את כל הנתונים שנאגרו"
    export function deleteLogs(): void {
        datalogger.deleteLog(datalogger.DeleteType.Full)
    }
