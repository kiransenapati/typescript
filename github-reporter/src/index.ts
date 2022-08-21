import * as _ from 'lodash';
import {GithubApiService} from './GithubApiService';
import { Repo } from './Repo';
import { User } from './User';

let svc = new GithubApiService();
if (process.argv.length < 3) {
    console.log("Please pass the user name as a argument");
} else {
    let username = process.argv[2];
    svc.getUserInfo(username, (user: User) => {
        svc.getRepos(username, (repos: Repo[]) => {
            
            let sortedRepos = _.sortBy(repos, [(repo: Repo) => repo.forksCount * -1]);
            user.repos = _.take(sortedRepos, 5);
            console.log(user);
        });
    });
}


