module.exports = {


    friendlyName: 'Request',


    description: 'Request appraisal.',


    inputs: {
        m1sid: {
            type: 'string',
            description: 'Special identifier for the property',
            required: true
        },
        mortid: {
            type: 'string',
            description: 'Mort id given by MBR',
            required: true
        },
        name: {
            type: 'string',
            description: 'Name of the customer.',
            required: true
        }
    },


    exits: {
        success: {
            statusCode: 200,
            description: 'Appraisal request created'
        }
    },


    fn: async function (inputs, exits) {

        let appraisalRequest = {
            m1sid: inputs.m1sid,
            mortid: inputs.mortid,
            name: inputs.name
        }

        let appraisal = await Appraisal.create(appraisalRequest);
        return exits.success({ message: 'Appraisal Request Successful' });
    }


};
