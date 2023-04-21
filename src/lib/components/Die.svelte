            <div class="die">
                <p>20</p>
                <p class="die-remove">-</p>
            </div>
<style>
    .die{
        height: 10rem;
        max-height: 10rem;
        max-width: 10rem;
        position: relative;
        transition: all 0.2s ease-out;
        display: grid;
        place-items: center;
        padding: 1rem;
        border-radius: 0.3rem;
        margin-right: 1rem;
        margin-bottom: 1rem;
        background-color: var(--panel-color);
    }
    .die:active .die-remove{
        display: grid;
        opacity: 1;
    }
    .die:hover .die-remove{
        display: grid;
        opacity: 1;
    }
    .die-remove{
        cursor: pointer;
        transition: all 0.7s ease-in-out;
        position: absolute;
        background-color: var(--statement-color);
        border-top-left-radius: 0.3rem;
        font-size: 2rem;
        padding: 0.2rem;
        display: grid;
        place-content: center;
        width: 2rem;
        height: 2rem;
        top: 0;
        left: 0;
    }
            </style>