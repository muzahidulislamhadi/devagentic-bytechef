/*
 * Copyright 2025 ByteChef
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.bytechef.platform.configuration.facade;

import com.bytechef.evaluator.SpelEvaluator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

/**
 * @author Igor Beslic
 * @author Ivica Cardic
 */
public class WorkflowNodeParameterFacadeTest {

    private static final WorkflowNodeParameterFacadeImpl WORKFLOW_NODE_PARAMETER_FACADE =
        new WorkflowNodeParameterFacadeImpl(null, null, SpelEvaluator.create(), null, null, null, null, null);

    @Test
    public void testEvaluate() {
        Map<String, Object> parametersMap = Map.of(
            "body", Map.of("bodyContentType", "JSON"));

        boolean result = WORKFLOW_NODE_PARAMETER_FACADE.evaluate(
            "body.bodyContentType == 'JSON'", Map.of(), Map.of(), parametersMap);

        Assertions.assertTrue(result);

        result = WORKFLOW_NODE_PARAMETER_FACADE.evaluate(
            "body.bodyContentType == 'XML'", Map.of(), Map.of(), parametersMap);

        Assertions.assertFalse(result);
    }

    @Test
    public void testEvaluateArray() {
        Map<String, Object> parametersMap = Map.of(
            "conditions",
            List.of(
                List.of(Map.of("operation", "REGEX"), Map.of("operation", "EMPTY")),
                List.of(Map.of("operation", "REGEX"))));

        Map<String, String> displayConditionMap = new HashMap<>();

        WORKFLOW_NODE_PARAMETER_FACADE.evaluateArray(
            "name", "conditions[index][index].operation != 'EMPTY'", displayConditionMap, Map.of(), Map.of(),
            parametersMap);

        Assertions.assertEquals(2, displayConditionMap.size());
        Assertions.assertEquals(
            Map.of(
                "conditions[0][0].operation != 'EMPTY'", "0_0_name",
                "conditions[1][0].operation != 'EMPTY'", "1_0_name"),
            displayConditionMap);

        displayConditionMap = new HashMap<>();

        WORKFLOW_NODE_PARAMETER_FACADE.evaluateArray(
            "name", "conditions[index][index].operation == 'EMPTY'", displayConditionMap, Map.of(), Map.of(),
            parametersMap);

        Assertions.assertEquals(1, displayConditionMap.size());
        Assertions.assertEquals(Map.of("conditions[0][1].operation == 'EMPTY'", "0_1_name"), displayConditionMap);

        parametersMap = Map.of(
            "conditions",
            List.of(
                List.of(Map.of("operation", "REGEX"), Map.of("operation", "EMPTY")),
                List.of(Map.of("operation", "NOT_CONTAINS"))));

        displayConditionMap = new HashMap<>();

        WORKFLOW_NODE_PARAMETER_FACADE.evaluateArray(
            "name", "!contains({'EMPTY','REGEX'}, conditions[index][index].operation)", displayConditionMap, Map.of(),
            Map.of(), parametersMap);

        Assertions.assertEquals(1, displayConditionMap.size());
        Assertions.assertEquals(
            Map.of("!contains({'EMPTY','REGEX'}, conditions[1][0].operation)", "1_0_name"), displayConditionMap);
    }

    @Test
    public void testHasExpressionVariable() {
        String[] expressions = {
            "variableName == 45", "'string' == variableName", "prefixVariableName!= newValue1 && !variableName ",
            "variableNameSuffix!= variableValue1 && !variableName", "prefixVariableName == 44 or variableName lt 45"
        };

        for (String expression : expressions) {
            Assertions.assertTrue(
                WorkflowNodeParameterFacadeImpl.hasExpressionVariable(expression, "variableName"),
                expression + "doesn't contain variableName");
        }

        String[] noVariableNameExpressions = {
            "prefixVariableName == 45", "'A' == variableNameSuffix", "prefixVariableName!= val && !variableNameSuffix ",
            "variableNameSuffix!= variableValue1 && !prefixVariableName", "prefixVariableName>44 or variableNameS lt 45"
        };

        for (String noVariableExpression : noVariableNameExpressions) {
            Assertions.assertFalse(
                WorkflowNodeParameterFacadeImpl.hasExpressionVariable(
                    noVariableExpression, "variableName", null),
                noVariableExpression + " doesn't contain variableName");
        }
    }
}
