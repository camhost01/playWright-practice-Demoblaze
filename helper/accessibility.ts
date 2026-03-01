import { Page, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
/**
 *  Run the accessiblity guidelines: WCAG2A, WCAG2AA, WCAG2.1AA, best-pracices
 *  more detail 
 *  https://www.deque.com/axe/core-documentation/api-documentation/#axecore-tags
 *  @example
 *  await accessibility.runAxeScan();
 * */
export async function runAxeScan(page: Page, tags: string[] = ['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice']) {
    const accesibilityResults = await new AxeBuilder({ page })
        .withTags(tags)
        .analyze();
    const resultScan = accesibilityResults.violations.map(violation => {
        return {
            id: violation.id,
            impact: violation.impact,
            description: violation.description,
            solve: violation.help,
            nodes: violation.nodes.map(node => {
                return {
                    html: node.html,
                    target: node.target,
                    summary: node.failureSummary
                }
            })
        }
    });
    console.log("Accessibility Scan Results: ", JSON.stringify(resultScan, null, 2));
    expect(accesibilityResults.violations).toEqual([]);
    return accesibilityResults;
};
/**
 *  Run the accessiblity guidelines: WCAG2A, WCAG2AA, WCAG2.1AA, best-pracices on specifict element of the page
 *  more detail 
 *  https://www.deque.com/axe/core-documentation/api-documentation/#axecore-tags
 *  @param selector - String of the CCS value of the locator element from the page
 *  @example
 *  await accessibility.runAxeOnElement('[aria-label="modal"]');
 * */
export async function runAxeOnElement(page: Page, selector: string, tags: string[] = ['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice']) {
    const element = page.locator(selector);
    await element.scrollIntoViewIfNeeded();
    await element.waitFor();
    const accesibilityResults = await new AxeBuilder({ page })
        .withTags(tags)
        .include(selector)
        .analyze();
    const resultScan = accesibilityResults.violations.map(violation => {
        return {
            id: violation.id,
            impact: violation.impact,
            description: violation.description,
            solve: violation.help,
            nodes: violation.nodes.map(node => {
                return {
                    html: node.html,
                    target: node.target,
                    sumary: node.failureSummary
                }
            })
        }
    });
    console.log("Accessibility Scan Results: ", JSON.stringify(resultScan, null, 2));
    expect(accesibilityResults.violations).toEqual([]);
    return accesibilityResults;

};
/**
 *  Run the accessiblity guidelines: WCAG2A, WCAG2AA, WCAG2.1AA, best-pracices exluding an specifict element of the page
 *  more detail 
 *  https://www.deque.com/axe/core-documentation/api-documentation/#axecore-tags
 *  @param selector - String of the CCS value of the locator element from the page
 *  @example
 *  await accessibility.runAxeExcludElement('[aria-label="modal"]');
 * */
export async function runAxeExcludElement(page: Page, selector: string, tags: string[] = ['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice']) {
    const element = page.locator(selector);
    await element.scrollIntoViewIfNeeded();
    await element.waitFor();
    const accesibilityResults = await new AxeBuilder({ page })
        .withTags(tags)
        .exclude(selector)
        .analyze();
    const resultScan = accesibilityResults.violations.map(violation => {
        return {
            id: violation.id,
            impact: violation.impact,
            description: violation.description,
            solve: violation.help,
            nodes: violation.nodes.map(node => {
                return {
                    html: node.html,
                    target: node.target,
                    sumary: node.failureSummary
                }
            })
        }
    });
    console.log("Accessibility Scan Results: ", JSON.stringify(resultScan, null, 2));
    expect(accesibilityResults.violations).toEqual([]);
    return accesibilityResults;

}
