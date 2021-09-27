import { User } from "../models/userModel"

export const login = async(req, res, next) =>
{
    const { email, password } = req.body;

    const user = await User.findOne( 
        { email: email }, 
        async(err, doc) => 
        {
            if(err)
                return res.status(400).send({ success: false, error: err, message: 'DB connection issue. Try Again',  })
        }
    )
    if(!user)
        return res.status(401).send({ success: false, flag: 'email', message: 'Email non risulta registrata' })
    else
    {
        if(user.password !== password)
            return res.status(401).send({ success: false, flag: 'password', message: 'Password errata. Riprova' })
        else
        {
            req.session.user = user._id.toString();
            res.status(200).send({ success: true, message: 'LOGIN SUCCESSFULL' })
        }
    }
}

export const registerAdmin = async(req, res, next) => 
{
    //cryptare password
    const { user, email, password } = req.body;

    const findUser = await User.findOne( 
        { email: email }, 
        async(err, doc) => 
        {
            if(err)
                return res.status(400).send({ success: false, error: err, message: 'DB connection issue. Try Again' })
            else if(doc)
                return res.status(400).send({ success: false, flag: 'email', message: 'Email gia registrata con noi' })
            else if(!doc)
            {
                await User.findOne(
                    { user: user }, 
                    async(err, doc2) => 
                    {
                        if(err)
                            return res.status(400).send({ success: false, error: err, message: 'DB connection issue. Try Again' })
                        else if(doc2)
                            return res.status(400).send({ success: false, flag: 'user', message: 'Username gia esistente' })
                    }
                )
            }
        }
    )
    if(findUser)
        return res.status(400).send({ success: false, error: err, message: 'Errore! Riprova' })
    else
    {
        const newUser = await User.create(
            { user, email, password, isAdmin: true },
            (err, doc) => 
            {
                if(err)
                    return res.status(400).send({ success: false, message: 'Errore nel salvataggio, Riprova' })
                else if(doc)
                {
                    req.session.user = doc._id.toString();
                    res.status(200).send({ success: true, message: 'ADMIN Registered' })
                }
            }
        );
    }
}

export const registerUser = async(req, res, next) => 
{
    //cryptare password
    const { user, email, password } = req.body;

    const findUserByEmail = await User.findOne( 
        { email: email }, 
        async(err, doc) => 
        {
            if(err)
                return res.status(400).send({ success: false, error: err, message: 'DB connection issue. Try Again' })
        }
    )
    if(findUserByEmail)
        return res.status(400).send({ success: false, flag: 'email', message: 'Email gia registrata con noi' })
    
    const findUserByUser = await User.findOne(
        { user: user }, 
        async(err, doc2) => 
        {
            if(err)
                return res.status(400).send({ success: false, error: err, message: 'DB connection issue. Try Again' })
        }
    )

    if(findUserByUser)
        return res.status(400).send({ success: false, flag: 'user', message: 'Username gia esistente' })
    else
    {
        const newUser = await User.create(
            { user, email, password },
            (err, doc) => 
            {
                if(err)
                    return res.status(400).send({ success: false, message: 'Errore nel salvataggio, Riprova' })
                else if(doc)
                {
                    req.session.user = doc._id.toString();
                    return res.status(200).send({ success: true, message: 'USER Registered' })
                }
            }
        );
    }
}

export const forgotPassword = async(req, res, next) =>
{

}

export const isLogged = async(req, res, next) => 
{
    const user = req.session.user
    if(!user)
        return res.status(404).send({ success: false, message: 'You are not logged in' })
    else
        return res.status(200).send({ success: true, message: 'Autorized' })
}

export const logout = async(req, res, next) => 
{
    req.session.destroy(err => err && next())
    res.send({ success: true, message: 'Logged Out' })
}