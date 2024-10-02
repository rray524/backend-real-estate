import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import * as dotenv from "dotenv";
import { getDataObjectByCollectionName } from "../helpers/validation/auth-validator";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET_KEY!;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
};

const jwtStrategy = new JwtStrategy(jwtOptions, async (payload: any, done) => {
  try {
    const user = await getDataObjectByCollectionName("users", payload.userId);

    if (user) {
      return done(null, {
        _id: user._id,
        email: user.email,
        is_verified: user.is_verified,
        referral_code: user.referral_code,
        referred_by: user.referred_by,
        created_at: user.created_at,
        agent_id: user.agent_id,
        buyer_id: user.buyer_id,
      });
    }
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
});

passport.use(jwtStrategy);

export default passport;
