import { isValidYoutubeUrl, isValidEmail } from './helpers';

test('isValidYoutubeUrl should work', async () => {
    const youtubeUrl="https://www.youtube.com/watch?v=DAJFmBP9dzU";
    expect(isValidYoutubeUrl(youtubeUrl)).toBeTruthy();

    const invalidYoutubeUrl="https://www.youtub.com/watch?v=DAJFmBP9dzU";
    expect(isValidYoutubeUrl(invalidYoutubeUrl)).toBeFalsy();
});

test('isValidEmail should work', async () => {
    const validEmail="someone@gmail.com";
    expect(isValidEmail(validEmail)).toBeTruthy();

    const inValidEmail="someone.gmail.com";
    expect(isValidEmail(inValidEmail)).toBeFalsy();
});
