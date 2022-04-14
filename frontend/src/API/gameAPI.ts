import axios from 'axios';
import { url } from '../config/config';

class gameAPI {
  async getAllAnswer() {
    return await axios
      .get(`${url}/api/answers/all`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async addGame(count: string | undefined) {
    return await axios
      .post(`${url}/api/games/addGame`, {count: count})
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async getGame(id: string | undefined) {
    return await axios
        .post(`${url}/api/games/getGame`, {id: id})
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.log(err);
        });
  }
  async getQuestion(id: string | undefined) {
    return await axios
        .post(`${url}/api/games/getQuestion`, {id: id})
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.log(err);
        });
  }
  async setAnswer(sessionId: string | undefined, questionId: string | undefined, answerId: string | undefined) {
    return await axios
        .post(`${url}/api/games/setAnswer`, {sessionId: sessionId, questionId: questionId, answerId: answerId})
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.log(err);
        });
  }
    async setCompleted(id: string | undefined) {
        return await axios
            .post(`${url}/api/games/setCompleted`, {id: id})
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

export default new gameAPI();
