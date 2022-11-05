import { Token } from '../models/Tokens'
import tokenService from '../services/token.service';


export const removeDeadTokens = async() => {
  let tokensCount = await Token.count();
  let offset = 0;
  let limit = 1000;
  while (tokensCount > 0) {
    if (limit > tokensCount) limit = tokensCount;
    const tokens = await Token.findAll({ limit, offset });
    for (const token of tokens) {
      if (!tokenService.validateToken(token.token, true)) {
        await Token.destroy({ where: { id: token.id } });
      }
    }
    tokensCount -= limit;
  }
}
