const axios = require('axios');
module.exports = {


    friendlyName: 'Complete info',


    description: '',


    inputs: {
        appraisalValue: {
            type: 'number',
            description: 'Value of the property'
        },
        mortid: {
            type: 'string',
            description: 'Mort id given by MBR',
            required: true
        },
        comments: {
            type: 'string',
            description: 'any comments of the appraisal'
        }
    },


    exits: {
        success: {
            statusCode: 200,
            description: 'Appraisal Complete'
        },
        invalid: {
            statusCode: 400,
            description: 'Invalid input'
        }

    },


    fn: async function (inputs, exits) {
        let updatedAppraisal = await Appraisal.updateOne({ mortid: inputs.mortid })
            .set({
                appraisalValue: inputs.appraisalValue,
                comments: inputs.comments
            });
        if (updatedAppraisal) {
            try {
                let response = await axios.post('http://localhost:1331/insurance/quote', {
                    mortid: updatedAppraisal.mortid,
                    appraisalValue: updatedAppraisal.appraisalValue,
                    m1sid: updatedAppraisal.m1sid
                });
                return exits.invalid({ message: 'Appraisal Successful' })
            } catch (e) {
                return exits.invalid({ message: 'Unable to contact insurance service.' })
            }
        } else {
            return exits.invalid({ message: 'Could not find MBR id.' })
        }


    }


};
