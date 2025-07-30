package comparators;

import java.util.Comparator;

import io.smartbreakdown.models.BreakdownItem;

public class BreakdownItemComparator implements Comparator<BreakdownItem> {

    @Override
    public int compare(BreakdownItem o1, BreakdownItem o2) {
        return Double.compare(o2.getDenomination(), o1.getDenomination());
    }
}
