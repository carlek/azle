import {
    Query,
    Update,
    u32
} from 'azle';
import {
    Thread,
    Threads
} from './candid_types';
import { getPostFromStatePost } from './posts';
import {
    state,
    StateThread
} from './state';
import { getUserFromStateUser } from './users';

export function createThread(
    title: string,
    authorId: string,
    joinDepth: u32
): Update<Thread> {
    const id = Object.keys(state.threads).length.toString();

    const stateThread = {
        id,
        authorId,
        postIds: [],
        title
    };

    state.threads[id] = stateThread;

    const stateAuthor = state.users[authorId];
    const updatedStateAuthor = {
        ...stateAuthor,
        threadIds: [...stateAuthor.threadIds, stateThread.id]
    };

    state.users[authorId] = updatedStateAuthor;
    
    const thread = getThreadFromStateThread(stateThread, joinDepth);

    return thread;
}

export function getAllThreads(joinDepth: u32): Query<Threads> {
    return Object.values(state.threads).map((stateThread) => getThreadFromStateThread(stateThread, joinDepth));
}

export function getThreadFromStateThread(
    stateThread: StateThread,
    joinDepth: u32
): Thread {
    const stateAuthor = state.users[stateThread.authorId];
    const author = getUserFromStateUser(stateAuthor, joinDepth);

    if (joinDepth === 0) {
        return {
            id: stateThread.id,
            author,
            posts: [],
            title: stateThread.title
        };
    }
    else {
        const posts = stateThread
            .postIds
            .map((postId) => state.posts[postId])
            .map((statePost) => getPostFromStatePost(statePost, joinDepth - 1));

        return {
            id: stateThread.id,
            author,
            posts,
            title: stateThread.title
        };
    }
}