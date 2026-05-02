/**
 * שלוחת אוגר נתונים חכם - הכל ביחידה אחת
 */
//% color=#2c3e50 icon="\uf0ce" block="אוגר נתונים מאוחד"
namespace SmartLogger {

    /**
     * רושם נתונים לאחסון הפנימי, שולח אותם ל-Serial (לאחסון חיצוני) ומשדר ברדיו
     */
    //% block="רשום ושלח נתונים: מפתח %key ערך %value || קבוצת רדיו %group"
    //% group.defl=1
    export function logEverything(key: string, value: string, group: number = 1): void {
        // 1. שמירה באחסון פנימי (קובץ MY_DATA)
        datalogger.log(datalogger.createCV(key, value))

        // 2. שליחה ל-Serial (עבור רכיב SD חיצוני או מחשב)
        serial.writeLine(key + ":" + value)

        // 3. שידור ברדיו
        radio.setGroup(group)
        radio.sendString(key + ":" + value)

        // אישור ויזואלי קטן על המסך
        led.plot(0, 0)
        basic.pause(100)
        led.unplot(0, 0)
    }

    /**
     * בלוק עבור המיקרוביט המקבל: מאזין לרדיו ושומר הכל אוטומטית
     */
    //% block="הפעל האזנה ואגירה אוטומטית מרדיו בקבוצה %group"
    export function startListening(group: number): void {
        radio.setGroup(group)
        radio.onReceivedString(function (receivedString) {
            // פירוק הנתון (מפתח:ערך) ושמירה
            datalogger.log(datalogger.createCV("Received", receivedString))
            basic.showIcon(IconNames.SmallDiamond, 100)
            basic.clearScreen()
        })
    }

    /**
     * הצגת נתון אחרון על המסך (גלילה)
     */
    //% block="הצג טקסט %text על המסך"
    export function display(text: string): void {
        basic.showString(text)
    }

    /**
     * מחיקה סופית של כל הנתונים שנאגרו בזיכרון
     */
    //% block="מחק את כל המידע שנאגר"
    export function clearStorage(): void {
        datalogger.deleteLog(datalogger.DeleteType.Full)
        basic.showIcon(IconNames.No)
    }
}
