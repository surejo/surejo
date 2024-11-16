import * as yup from 'yup';

const userSchema = yup.object().shape({
  name: yup.string(),
  email: yup.string().email().required(),
  role: yup.string().required().oneOf(['FREELANCER', 'CLIENT']),
  category: yup.string().required().oneOf(['DESIGN', 'DEVELOPMENT', 'WRITING', 'EDITING', 'OTHER'])
});

export default userSchema;