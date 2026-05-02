//% color=#2c3e50 icon="\uf0ce" block="אוגר נתונים + רדיו"
namespace SmartLogger {

    /**
     * רושם נתונים לאוגר הפנימי ושולח אותם אוטומטית ברדיו כטקסט
     */
    //% block="רשום נתונים $data"
    //% data.shadow="lists_create_with"
    //% data.defl="smart_log_create_cv"
    export function logWithRadio(data: datalogger.ColumnValue[]): void {
        // 1. רישום לאוגר הפנימי (עבור קובץ ה-HTM בסייר הקבצים)
        datalogger.logData(data)

        // 2. בניית הודעת טקסט ושליחה ברדיו (למשל "temp:25,light:100")
        let msg = ""
        for (let cv of data) {
            msg += cv.column + ":" + cv.value + ","
        }
        if (msg.length > 0) {
            radio.sendString(msg.substr(0, msg.length - 1))
        }
    }

    /**
     * יצירת זוג עמודה וערך (הבלוק שמתחבר לתוך ה-Log)
     */
    //% block="עמודה $column ערך $value"
    //% blockId=smart_log_create_cv
    //% blockHidden=false
    //% value.shadow=math_number
    export function createCV(column: string, value: any): datalogger.ColumnValue {
        return datalogger.createCV(column, value)
    }

    /**
     * מחיקת האוגר (כמו הבלוק המקורי)
     */
    //% block="מחק נתונים $delType"
    //% delType.defl=datalogger.DeleteType.Full
    export function deleteLog(delType: datalogger.DeleteType): void {
        datalogger.deleteLog(delType)
    }

    /**
     * הגדרת חותמת זמן (כמו הבלוק המקורי)
     */
    //% block="הגדר חותמת זמן $format"
    export function setTimestamp(format: datalogger.TimeFormat): void {
        datalogger.setTimestamp(format)
    }
}

