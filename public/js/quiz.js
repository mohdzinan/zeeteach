'use strict';

(() => {
    const host = document.getElementById('quiz-chapters');
    const checkedChoices = new Map();

    function make(tag, className, text) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (text !== undefined) element.textContent = text;
        return element;
    }

    function updateScore(message) {
        const correct = [...checkedChoices.values()].filter(Boolean).length;
        const checked = checkedChoices.size;
        document.getElementById('score-count').textContent = `${correct} / ${quizData.length}`;
        document.getElementById('score-message').textContent = checked === quizData.length
            ? `All ${checked} multiple-choice questions checked`
            : `${checked} of ${quizData.length} multiple-choice questions checked`;
        if (message) document.getElementById('score-message').textContent = message;
    }

    function buildChoice(question, questionId) {
        const form = make('fieldset', 'choice-list');
        const legend = make('legend', 'visually-hidden', 'Choose one answer');
        form.append(legend);
        question.options.forEach((option, index) => {
            const label = make('label', 'choice-option');
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = questionId;
            input.value = String(index);
            label.append(input, make('span', '', option));
            form.append(label);
        });
        const controls = make('div', 'question-actions');
        const check = make('button', 'quiz-action', 'Check answer');
        check.type = 'button';
        const feedback = make('p', 'choice-feedback');
        feedback.setAttribute('role', 'status');
        check.addEventListener('click', () => {
            const selected = form.querySelector('input:checked');
            if (!selected) {
                feedback.className = 'choice-feedback feedback-neutral';
                feedback.textContent = 'Choose an option before checking your answer.';
                return;
            }
            const correct = Number(selected.value) === question.answer;
            checkedChoices.set(questionId, correct);
            feedback.className = `choice-feedback ${correct ? 'feedback-correct' : 'feedback-incorrect'}`;
            feedback.textContent = `${correct ? 'That is correct.' : 'Review this one.'} ${question.feedback}`;
            updateScore();
        });
        controls.append(check, feedback);
        return [form, controls];
    }

    function buildWritten(question, questionId) {
        const response = document.createElement('textarea');
        response.id = `${questionId}-response`;
        response.rows = 4;
        response.setAttribute('aria-label', `Your answer: ${question.prompt}`);
        response.placeholder = 'Write a few complete sentences before opening the model response.';
        const label = make('label', 'response-label', 'Your response');
        label.htmlFor = response.id;
        const hint = document.createElement('details');
        hint.className = 'quiz-disclosure';
        hint.append(make('summary', '', 'Open a hint'));
        hint.append(make('p', '', question.hint));
        const model = document.createElement('details');
        model.className = 'quiz-disclosure model-answer';
        model.append(make('summary', '', 'Compare with a model response'));
        model.append(make('p', '', question.model));
        model.append(make('p', 'self-check-prompt', 'Self-check: Did your answer explain the key idea, support it with a reason or example, and address every part of the prompt?'));
        return [label, response, hint, model];
    }

    quizData.forEach((chapter, chapterIndex) => {
        const section = make('section', 'quiz-chapter');
        section.id = chapter.id;
        section.setAttribute('aria-labelledby', `${chapter.id}-title`);
        const heading = make('header', 'quiz-chapter-heading');
        heading.append(make('p', 'eyebrow', `${chapter.code} · ${chapter.marks} MARKS · QUESTION SET ${String(chapterIndex + 1).padStart(2, '0')}`));
        heading.append(make('h2', '', chapter.title));
        section.append(heading);

        chapter.questions.forEach((question, questionIndex) => {
            const questionId = `${chapter.id}-q${questionIndex + 1}`;
            const article = make('article', 'quiz-question');
            article.setAttribute('aria-labelledby', `${questionId}-title`);
            const number = make('span', 'question-number', String(questionIndex + 1).padStart(2, '0'));
            number.setAttribute('aria-hidden', 'true');
            const body = make('div', 'question-body');
            body.append(make('p', 'question-type', question.type));
            body.append(make('h3', '', question.prompt));
            body.querySelector('h3').id = `${questionId}-title`;
            if (question.format === 'choice') body.append(...buildChoice(question, questionId));
            else body.append(...buildWritten(question, questionId));
            article.append(number, body);
            section.append(article);
        });
        host.append(section);
    });
})();
