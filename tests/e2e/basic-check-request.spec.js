import checkPage from '../../DevOps/matman-app/case_modules/users/basic-check-request.js';

/**
 * @author tangitan
 * @priority P1
 * @casetype e2e
 */
describe('端对端测试样例', () => {
    let resultData;
    beforeAll(async function () {
        resultData = await checkPage({
            show: false,
            useRecorder: true,
            doNotCloseBrowser: false,
            queryDataMap: {
                users: 'success_base'
            }
        });
    });

    test('页面标题为Welcome to Your Vue.js App', () => {
        expect(resultData.get('init').title.text).toBe('Welcome to Your Vue.js App');
    });

    test('初始名称为Evan You', () => {
        expect(resultData.get('init').info.githubName).toBe('Evan You');
    });

    test('点击按钮后更改为Jinjiang', () => {
        expect(resultData.get('click to change').info.githubName).toBe('Jinjiang');
    });

    test('再次点击名称变回Evan You', () => {
        expect(resultData.get('click to change again').info.githubName).toBe('Evan You');
    });
}) 