const objectDefinitions = require('./object-definitions.js')

async function mGetCurrSelectionFields() {
    let sessionObj = await this.createSessionObject(objectDefinitions.sessionList)
    let selections = await sessionObj.getLayout()
    return selections
}

/**
 * Get current selections
 */
async function mGetCurrentSelections() {

    let selections = await getCurrSelectionFields()

    let fieldsSelected = selections.qSelectionObject.qSelections.map(function (s) {
        return s.qField
    })

    return { selections: selections.qSelectionObject.qSelections, fields: fieldsSelected }
}

/**
 * Select value(s) in a field
 * @param {string} fieldName - Name of the field
 * @param {array} values - String array with the values to be selected
 * @param {boolean} [toggle=false] toggle - How to apply the selection
 */
async function mSelectInField({ fieldName, values, toggle = false }) {
    let field = await this.getField(fieldName)

    let valuesToSelect = values.map(function (v) {
        return {
            qText: v
        }
    })

    try {
        let selection = await field.selectValues({ qFieldValues: valuesToSelect, qToggleMode: toggle })
        return selection
    } catch(e) {
        console.log(e.message)
        return false
    }
}

module.exports = {
    mGetCurrSelectionFields,
    mSelectInField,
    mGetCurrentSelections
}
